import { Injectable, OnDestroy, Inject } from '@angular/core';
import { OidcSecurityService, OpenIdConfiguration, AuthWellKnownEndpoints, AuthorizationResult, AuthorizationState } from 'angular-auth-oidc-client';
import { Observable ,  Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roles = [];
  isAuthorized = false;

  constructor(private oidcSecurityService: OidcSecurityService,
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') private originUrl: string,
    @Inject('AUTH_URL') private authUrl: string,) { 
      const openIdConfiguration: OpenIdConfiguration = {
        stsServer: this.authUrl,
        redirect_url: this.originUrl + 'callback',
        client_id: 'UserManagement',
        response_type: 'code',
        scope: 'openid profile email role UserManagement',
        post_logout_redirect_uri: this.originUrl,
        forbidden_route: '/forbidden',
        unauthorized_route: '/unauthorized',
        silent_renew: true,
        silent_renew_url: this.originUrl + 'silent-renew.html',
        silent_renew_offset_in_seconds: 15,
        history_cleanup_off: true,
        auto_userinfo: true,
        log_console_warning_active: true,
        log_console_debug_active: true,
        max_id_token_iat_offset_allowed_in_seconds: 10,
      };
      
      const authWellKnownEndpoints: AuthWellKnownEndpoints = {
        issuer: this.authUrl,
        jwks_uri: this.authUrl + '/.well-known/openid-configuration/jwks',
        authorization_endpoint: this.authUrl + '/connect/authorize',
        token_endpoint: this.authUrl + '/connect/token',
        userinfo_endpoint: this.authUrl + '/connect/userinfo',
        end_session_endpoint: this.authUrl + '/connect/endsession',
        check_session_iframe: this.authUrl + '/connect/checksession',
        revocation_endpoint: this.authUrl + '/connect/revocation',
        introspection_endpoint: this.authUrl + '/connect/introspect',
      };
  
      this.oidcSecurityService.setupModule(openIdConfiguration, authWellKnownEndpoints);
  
      if (this.oidcSecurityService.moduleSetup) {
        this.doCallbackLogicIfRequired();
      } else {
        this.oidcSecurityService.onModuleSetup.subscribe(() => {
            this.doCallbackLogicIfRequired();
        });

      }

      this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe((isAuthorized => {
        console.log("this.oidcSecurityService.getIsAuthorized fired");
        console.log(isAuthorized);
        this.isAuthorized = isAuthorized;
      }));
  
      this.oidcSecurityService.onAuthorizationResult.subscribe(
        (authorizationResult: AuthorizationResult) => {
            this.onAuthorizationResultComplete(authorizationResult);
        });

    }

  private isAuthorizedSubscription: Subscription = new Subscription;

  public initAuth() {

  }

  public isInRole(role:string) : boolean{
    return this.roles != null && this.roles.some(element => {
      return element === role;
    });
  }
  
  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
    console.log('Auth result received AuthorizationState:'
        + authorizationResult.authorizationState
        + ' validationResult:' + authorizationResult.validationResult);
    console.log(authorizationResult);
    if (authorizationResult.authorizationState === AuthorizationState.unauthorized) {
        if (window.parent) {
            // sent from the child iframe, for example the silent renew
            this.router.navigate(['/unauthorized']);
        } else {
            window.location.href = '/unauthorized';
        }
    }
    else{
      this.oidcSecurityService.getUserData().subscribe(
        result =>{
          if(result != null && result.role != null){
            this.roles = result.role == null || Array.isArray(result.role) ? result.role : [result.role];
      }});
    }
  }

  private doCallbackLogicIfRequired() {
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }

  getIsAuthorized(): Observable<boolean> {
    return this.oidcSecurityService.getIsAuthorized();
  }

  getUserData(): Observable<any> {
    return this.oidcSecurityService.getUserData();
  }

  login() {
      this.oidcSecurityService.authorize();
  }

  logout() {
      this.oidcSecurityService.logoff();
  }

  get(url: string, params?: HttpParams): Observable<any> {
      return this.http.get(url, { headers: this.getHeaders(), params: params })
      .pipe(catchError((error) => {
          this.oidcSecurityService.handleError(error);
          return throwError(error);
      }));
  }

  put(url: string, data: any): Observable<any> {
      const body = JSON.stringify(data);
      return this.http.put(url, body, { headers: this.getHeaders() })
      .pipe(catchError((error) => {
          this.oidcSecurityService.handleError(error);
          return throwError(error);
      }));
  }

  delete(url: string): Observable<any> {
      return this.http.delete(url, { headers: this.getHeaders() })
      .pipe(catchError((error) => {
          this.oidcSecurityService.handleError(error);
          return throwError(error);
      }));
  }

  post(url: string, data: any): Observable<any> {
      const body = JSON.stringify(data);
      return this.http.post(url, body, { headers: this.getHeaders() })
      .pipe(catchError((error) => {
          this.oidcSecurityService.handleError(error);
          return throwError(error);
      }));
  }

  private getHeaders() {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.appendAuthHeader(headers);
  }

  public getToken() {
      const token = this.oidcSecurityService.getToken();
      return token;
  }

  private appendAuthHeader(headers: HttpHeaders) {
      const token = this.oidcSecurityService.getToken();

      if (token === '') { return headers; }

      const tokenValue = 'Bearer ' + token;
      return headers.set('Authorization', tokenValue);
  }
}
