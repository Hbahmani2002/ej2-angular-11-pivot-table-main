import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) {}
  public getTable(): Observable<any> {
    const url = 'https://localhost:7237/api/Pivot/PivotShow';
    return this.http.get<any>(url);
}
}
