import { Component, Inject, OnInit } from '@angular/core';
import { UiList, UiUserListItem} from '../../models';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private ActionUser: UiUserListItem;
  private UserList: UiList<UiUserListItem> = null;

  constructor(
    private userService: UserManagementService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.userService.getList("")
      .subscribe(result => {
        this.UserList = result;
      }, error => {
          console.error(error);
      });
  }

  remove(id:string){
    this.userService.remove(id)
      .subscribe(result => {
        this.loadList();
      }, error => {
        console.log(error);
      });  
  }

  confirmRemove(user:UiUserListItem, content:any){
    this.ActionUser = user;
    this.open(content);
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

}
