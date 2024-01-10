import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { BehaviorSubject,Observable,of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { ApplicationUser } from './Models/ApplicationUser';
import { Router } from '@angular/router';
import 'tslib';
interface LoginResult {
  username: string;
  role: string;
  originalUserName: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private token: string = '';
  private timer: Subscription | null = null;
  private _user = new BehaviorSubject<ApplicationUser | null>(null);
  user$ = this._user.asObservable();
  constructor(private http: HttpClient,private router: Router) {}
   getTable(): Observable<any> {
    const url = 'https://localhost:7237/api/Pivot/PivotShow';
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
   });

   const options = {
    headers: reqHeader,
  };
    return this.http.get(url,options);
    
}
login(username: string, password: string) {
  return this.http
    .post<LoginResult>('https://localhost:7237/api/user/login', { username, password })
    .pipe(
      map((x: LoginResult) => {
        this._user.next({
          username: x.username,
          role: x.role,
          originalUserName: x.originalUserName,
        });
        this.token=x.accessToken;
       
        this.startTokenTimer();
        return x;
      })
    );
}

logout() {
  this.http
    .post<unknown>('https://localhost:7237/api/user/logout', {})
    .pipe(
      finalize(() => {
       
        this._user.next(null);
        this.stopTokenTimer();
        this.router.navigate(['login']);
      })
    )
    .subscribe();
}
private stopTokenTimer() {
  this.timer?.unsubscribe();
}

private getTokenRemainingTime() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    return 0;
  }
  const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
  const expires = new Date(jwtToken.exp * 1000);
  return expires.getTime() - Date.now();
}


refreshToken(): Observable<LoginResult | null> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
   
    return of(null);
  }
}


private startTokenTimer() {
  const timeout = this.getTokenRemainingTime();
  this.timer = of(true)
    .pipe(
      delay(timeout),
      tap({
        next: () => this.refreshToken().subscribe(),
      })
    )
    .subscribe();
}


}
