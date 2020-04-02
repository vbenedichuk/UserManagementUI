import { Component, OnInit, Inject } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { UiUserDetails } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiResponse, UiResponseMessage } from 'src/app/models/UiResponse';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  private formStateEnum: any = FormState;
  private formState: FormState = FormState.Loading;
  private userDetails?: UiUserDetails;
  public alerts: UiResponseMessage[];

  constructor(
    private userService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute) {
    this.userDetails = null;
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    if (id != 'new' && id != null) {
      this.userService.get(id).subscribe(result => {
        this.userDetails = result;
        this.formState = FormState.Modify;
      }, (error) => {
        console.error(error);
      });
    }
    else {
      this.userDetails = new UiUserDetails;
      this.userDetails.Id = 'new';
      this.formState = FormState.CreateNew;
    }
  }

  save(){
    if(this.userDetails.validate()){
      this.userService.save(this.userDetails).subscribe(result => {
        console.log(result);
        this.router.navigate(['/user-list'])
      }, error => {
        var responseError = (error as HttpErrorResponse).error as UiResponse;
        if(responseError != null){
          this.alerts = responseError.Messages;
        }
      });
      console.log("VALID!");
    }
    else{
      console.log("NOT VALID!");
    }
  }
}

export enum FormState{
  Loading,
  CreateNew,
  Modify,
  View
}
