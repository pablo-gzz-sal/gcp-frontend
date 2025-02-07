import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 * Authentication Service
 *
 * This service handles user authentication, token storage,
 * and authentication status management.
 */
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/api/auth';

  // BehaviorSubject to track authentication status
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Logs in a user by sending credentials to the backend.
   * If successful, stores the JWT token in local storage
   * and updates the authentication status.
   *
   * @param email - User's email
   * @param password - User's password
   * @returns Observable with JWT token
   */
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

  /**
   * Fetches data from a protected endpoint.
   * Requires a valid authentication token.
   *
   * @returns Promise resolving to protected data or throws an error if not authenticated
   */
  async fetchProtectedData(): Promise<any> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    return firstValueFrom(
      this.http.get(`${this.apiUrl}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );
  }

  /**
   * Logs the user out by removing the token and redirecting to login.
   * Updates authentication status.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.authStatus.next(false);
  }

  /**
   * Checks whether the user is authenticated by observing the auth status.
   *
   * @returns Observable<boolean> indicating authentication status
   */
  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  /**
   * Helper function to check if a token exists in local storage.
   *
   * @returns true if token exists, false otherwise
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
