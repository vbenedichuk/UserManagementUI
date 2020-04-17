import { Component, OnInit } from '@angular/core';
import { UiResponseMessage } from 'src/app/models/UiResponse';
import { RoleManagementService } from 'src/app/services/role-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiRoleListItem } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-role-card',
  templateUrl: './role-card.component.html',
  styleUrls: ['./role-card.component.scss']
})

export class RoleCardComponent implements OnInit {
  public formStateEnum: any = FormState;
  public formState: FormState = FormState.Loading;
  public alerts: UiResponseMessage[];
  public roleDetails: UiRoleListItem;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleManagementService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != 'new' && id != null) {
      console.log("Loading role.")
      this.roleService.getRole(id).subscribe(result => {
        console.log("Role Loaded");
        console.log(result);
        this.roleDetails = result;
        this.formState = FormState.Modify;
      }, (error) => {
        console.error(error);
      });
    }
    else {
      this.roleDetails = new UiRoleListItem;
      this.roleDetails.Id = 'new';
      this.formState = FormState.CreateNew;
    }
  }

  save(){
    if(this.roleDetails.validate()){
      this.roleService.saveRole(this.roleDetails)
          .subscribe(result => {
            console.log(result);
            this.router.navigate(['/role-list']);            
          }, error => {
            if(error != null){
              console.log(error);
              this.alerts = error.error.Messages;
            }
          });
    }
  }

}

export enum FormState{
  Loading,
  CreateNew,
  Modify,
  View
}
