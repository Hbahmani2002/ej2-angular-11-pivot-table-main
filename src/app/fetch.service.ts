import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable,of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { ApplicationUser } from './Models/ApplicationUser';
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
  private timer: Subscription | null = null;
  private _user = new BehaviorSubject<ApplicationUser | null>(null);
  user$ = this._user.asObservable();
  constructor(private http: HttpClient) {}
  public getTable(): Observable<any> {
    const url = 'https://localhost:7237/api/Pivot/PivotShow';
    return this.http.get<any>(url);
}
login(username: string, password: string) {
  return this.http
    .post<LoginResult>('https://localhost:7237/api/Pivot/PivotShow/login', { username, password })
    .pipe(
      map((x) => {
        this._user.next({
          username: x.username,
          role: x.role,
          originalUserName: x.originalUserName,
        });
        this.setLocalStorage(x);
        this.startTokenTimer();
        return x;
      })
    );
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

setLocalStorage(x: LoginResult) {
  localStorage.setItem('access_token', x.accessToken);
  localStorage.setItem('refresh_token', x.refreshToken);
  localStorage.setItem('login-event', 'login' + Math.random());
}
clearLocalStorage() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.setItem('logout-event', 'logout' + Math.random());
}
refreshToken(): Observable<LoginResult | null> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    this.clearLocalStorage();
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
