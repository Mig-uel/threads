import { Component, signal, type OnDestroy, type OnInit } from '@angular/core';
import type { Subscription } from 'rxjs';
import { CommentComponent } from '../components/comment/comment.component';
import type { Comment } from '../interfaces/comment.interface';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home',
  imports: [CommentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  comments = signal<Comment[]>([]);
  commentsSubscription: Subscription | undefined;

  constructor(private commentService: CommentService) {}

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
  }
}
