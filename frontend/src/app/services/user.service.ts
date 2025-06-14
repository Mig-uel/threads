import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  localStorageKey = 'threads_user';
  constructor(private http: HttpClient) {}

  createUser(name: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, {
      name,
    });
  }

  saveUserToStorage(user: User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.localStorageKey);

    return user ? (JSON.parse(user) as User) : null;
  }
}
