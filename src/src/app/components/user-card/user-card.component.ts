import { Component, OnInit, Inject } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { UiUserDetails, UiRoleListItem, UiList } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiResponse, UiResponseMessage } from 'src/app/models/UiResponse';
import { UserManagementService } from 'src/app/services/user-management.service';
import { RoleManagementService } from 'src/app/services/role-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})

export class UserCardComponent implements OnInit {
  private formStateEnum: any = FormState;
  private formState: FormState = FormState.Loading;
  private userDetails?: UiUserDetails;
  private roleList: UiList<UiRoleListItem>;
  private alerts: UiResponseMessage[];

  constructor(
    private authService: AuthService,
    private userService: UserManagementService,
    private roleService: RoleManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
    this.userDetails = null;
  }

  ngOnInit() {
    if(this.authService.isInRole('Admin')){
      this.roleService.getRoles().subscribe(result =>
        {
          this.roleList = result;
        }, error =>{
          console.error(error);
        });
    }
    let id = this.route.snapshot.paramMap.get('id');
    if (id != 'new' && id != null) {
      this.userService.get(id).subscribe(result => {
        console.log(result);
        this.userDetails = result;
        this.formState = FormState.Modify;
      }, (error) => {
        console.error(error);
      });
    }
    else {
      this.userDetails = new UiUserDetails;
      this.userDetails.Id = 'new';
      console.log(this.userDetails);
      if(this.userDetails.Roles == null){
        this.userDetails.Roles = [];
      }
      this.formState = FormState.CreateNew;
    }
  }

  showRolesSelector(content:any){
    this.roleList.Items.forEach(element => {
      element.Selected = false;
      for(var i = 0; i < this.userDetails.Roles.length; i++){
        if(element.Id == this.userDetails.Roles[i].Id){
          element.Selected = true;
        }
      }
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  updateRoles(){
    this.userDetails.Roles = [];
    this.roleList.Items.forEach(element => {
      if(element.Selected){
        this.userDetails.Roles.push(element);
      }
    });
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
