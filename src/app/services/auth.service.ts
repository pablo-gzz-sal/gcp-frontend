import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.authStatus.next(true);
        })
      );
  }

  async fetchProtectedData(): Promise<any> {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Not authenticated")

      return this.http.get(`${this.apiUrl}/protected`, {
        headers: {Authorization: `Bearer ${token}`}
      }).toPromise()
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
    this.authStatus.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
