import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MS } from '../../config/constant';

@Injectable({
  providedIn: 'root',
})
export class ApiService<K> {
  baseUrl: string = MS.BASE_API_URL;
  user: any;

  constructor(private httpClient: HttpClient) {}

  authToken(path: string, body: object = {}, opt?: object): Observable<K> {
    return this.httpClient.post<K>(this.baseUrl.concat(path), body, opt);
  }

  login(path: string, body: object = {}, opt: object = {}): Observable<K> {
    return this.httpClient.post<K>(this.baseUrl.concat(path), body, opt);
  }

  register(path: string, body: object = {}, opt?: object): Observable<K> {
    return this.httpClient.post<K>(this.baseUrl.concat(path), body, opt);
  }

  create(path: string, body: object = {}, opt?: object): Observable<K> {
    return this.httpClient.post<K>(this.baseUrl.concat(path), body, opt);
  }

  readAll(path: string): Observable<K> {
    return this.httpClient.get<K>(this.baseUrl.concat(path));
  }

  update(path: string, username: any): Observable<K> {
    return this.httpClient.put<K>(this.baseUrl.concat(path), username);
  }

  delete(path: string): Observable<K> {
    return this.httpClient.delete<K>(this.baseUrl.concat(path));
  }
}
