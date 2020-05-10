import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isAuthorized = false;
  private isAuthorizedSubscription: Subscription = new Subscription();
  
  constructor(public authService: AuthService) {
    this.isAuthorizedSubscription = this.authService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      }); 
  }

  ngOnDestroy(): void {
    this.isAuthorizedSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  public login() {
    this.authService.login();
  }

}
