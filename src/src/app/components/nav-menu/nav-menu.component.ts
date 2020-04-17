import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router"

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isAuthorized = false;
  private isAuthorizedSubscription: Subscription = new Subscription();
  private userDataSubscription: Subscription = new Subscription();
  public userName:string = "";
  public userId:string = "";

  constructor(public authService: AuthService, private router: Router) { 
    this.isAuthorizedSubscription = this.authService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        console.log("getIsAuthorized fired.");
        console.log(isAuthorized);
        this.isAuthorized = isAuthorized;
        if(!isAuthorized){
          this.router.navigate(['']);
        }
      });      
      
    this.userDataSubscription = this.authService.getUserData().subscribe( 
      (userInfo: any) => { 
        if(userInfo!=null) {
          console.log("UserInfo", userInfo); 
          this.userName = userInfo.name;
          this.userId = userInfo.sub;
        }
      });

  }

  ngOnDestroy(): void {
    this.isAuthorizedSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  public login() {
    this.authService.login();
  }
 
  public logout() {
    this.authService.logout();
  }
}
