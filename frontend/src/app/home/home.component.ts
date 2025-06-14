import { Component, signal, type OnDestroy, type OnInit } from '@angular/core';
import type { Subscription } from 'rxjs';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { CommentComponent } from '../components/comment/comment.component';
import type { Comment } from '../interfaces/comment.interface';
import { CommentService } from '../services/comment.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-home',
  imports: [CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  comments = signal<Comment[]>([]);
  commentsSubscription: Subscription | undefined;
  createCommentSub: Subscription | undefined;

  constructor(
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentsSubscription = this.commentService.getComments().subscribe({
      next: (comments) => {
        this.comments.set(comments);
      },
    });
  }

  ngOnDestroy(): void {
    this.commentsSubscription?.unsubscribe();
    this.createCommentSub?.unsubscribe();
  }

  // TODO => implement this in the comment-form component
  createComment(event: { text: string }) {
    const { text } = event;
    const user = this.userService.getUserFromStorage();

    if (!user) return;

    this.createCommentSub = this.commentService
      .createComment({
        text,
        userId: user._id,
      })
      .subscribe({
        next: (comment) => this.comments.update((prev) => [...prev, comment]),
      });
  }
}
