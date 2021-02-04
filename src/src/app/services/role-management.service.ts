import { Injectable, Inject } from '@angular/core';
import { AuthService } from './auth.service';
import { UiRoleListItem, UiList } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiResponse } from '../models/UiResponse';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  constructor(private authService: AuthService, 
    @Inject('API_URL') private apiUrl: string) { }

  public getRoles():Observable<UiList<UiRoleListItem>>{
    return this.authService.get(this.apiUrl + '/api/Role')
      .pipe(map(result =>{
        return result as UiList<UiRoleListItem>;
      }));
  }

  public delete(id: string): Observable<any>{
    return this.authService.delete(this.apiUrl + '/api/Role/' + id);
  }

  public getRole(id: string):Observable<UiRoleListItem>{
    return this.authService.get(this.apiUrl + '/api/Role/' + id)
      .pipe(map(result => {
        console.log(result);
        var mappedResult = new UiRoleListItem();
        mappedResult.Id = result.Id;
        mappedResult.Name = result.Name;
        return mappedResult;
      }));
  }
  
  public saveRole(role : UiRoleListItem):Observable<UiResponse>{
    if(role.Id == 'new'){
      return this.authService.post(this.apiUrl + '/api/Role', role)
        .pipe(map(
          result => {
              return result as UiResponse
          }));
    }
    else{
      return this.authService.put(this.apiUrl + '/api/Role/' + role.Id, role)
        .pipe(map(
          result => {
              return result as UiResponse
          }));
    }
  }
}
