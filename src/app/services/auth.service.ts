import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api'; // your Django backend URL
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  // register(data: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register/`, data, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   });
  // }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login/`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
