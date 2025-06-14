import { Component, effect, input, signal } from '@angular/core';
import { single, type Subscription } from 'rxjs';
import type { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment',
  imports: [CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  comment = input.required<Comment>();
  nestedComments = signal<Comment[]>([]);

  isExpanded = signal(false);
  isReplying = signal(false);
  isLoading = signal(false);

  constructor(private commentsService: CommentService) {}

  nestedCommentsEffect = effect((cleanupFn) => {
    let nestedCommentsSubscription: Subscription | undefined;

    if (this.isExpanded()) {
      nestedCommentsSubscription = this.commentsService
        .getComments(this.comment()._id)
        .subscribe({
          next: (comments) => {
            this.nestedComments.set(comments);
            this.isLoading.set(false);
          },
        });
    }

    cleanupFn(() => nestedCommentsSubscription?.unsubscribe());
  });

  toggleExpand() {
    this.isExpanded.update((prev) => {
      if (!prev) this.isLoading.set(true);
      return !prev;
    });
  }

  toggleReplying() {
    this.isReplying.update((prev) => !prev);

    if (this.isReplying()) this.isExpanded.set(true);
  }
}
