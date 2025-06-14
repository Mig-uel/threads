import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import type { Subscription } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userSub: Subscription | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUserFromStorage();

    if (!user) {
      const randomName = `user_${Date.now()}`;

      this.userSub = this.userService.createUser(randomName).subscribe({
        next: (u) => {
          this.userService.saveUserToStorage(u);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
