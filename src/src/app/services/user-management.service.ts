import { Injectable, Inject } from '@angular/core';
import { UiUserListItem, UiList, UiUserDetails } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UiResponse } from '../models/UiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private authService: AuthService, 
    @Inject('API_URL') private apiUrl: string) { }


  public getList(filter:string):Observable<UiList<UiUserListItem>>{
    return this.authService.get(this.apiUrl + '/api/User')
      .pipe(map(result => {
        return result as UiList<UiUserListItem>;
      }));
  }

  public get(id:string):Observable<UiUserDetails>{
    return this.authService.get(this.apiUrl + '/api/User/' + id)
      .pipe(map(result => {
        let user = new UiUserDetails();
        user.Id = result.Id;
        user.PhoneNumber = result.PhoneNumber;
        user.UserName = result.UserName;
        user.Email = result.Email;
        return user;
      }));
  }

  remove(id:string){
    return this.authService.delete(this.apiUrl + '/api/User/' + id);
  }
  
  public save(user : UiUserDetails):Observable<UiResponse>{
    if(user.Id == 'new'){
      return this.authService.post(this.apiUrl + '/api/User', user)
        .pipe(map(result => {
          return result as UiResponse;
        }));
    }
    else{
      return this.authService.put(this.apiUrl + '/api/User/' + user.Id, user)
        .pipe(map(result => {
          return result as UiResponse;
        }));
    }
  }
}
