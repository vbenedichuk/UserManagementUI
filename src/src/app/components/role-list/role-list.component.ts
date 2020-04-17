import { Component, OnInit } from '@angular/core';
import { UiList, UiRoleListItem } from '../../models';
import { RoleManagementService } from 'src/app/services/role-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  
  public RoleList: UiList<UiRoleListItem> = null;
  public ActionItem: UiRoleListItem;

  constructor(private roleService: RoleManagementService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.roleService.getRoles().subscribe((result: UiList<UiRoleListItem>) => {
      console.log(result);
      this.RoleList = result;
      console.log(this.RoleList);
    }, (error: any) => {
        console.error(error);
    });
  }

  remove(id:string){
    console.log("before delete");
    this.roleService.delete(id).subscribe(result => {
      this.loadList();
    }, error => {
      console.log(error);
    });  
  }

  confirmRemove(role:UiRoleListItem, content:any){
    this.ActionItem = role;
    this.open(content);
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

}
