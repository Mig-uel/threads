import { Component, effect, input, signal } from '@angular/core';
import type { Subscription } from 'rxjs';
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
  nestedCommentsSubscription: Subscription | undefined;

  isExpanded = signal(false);
  isReplying = signal(false);

  constructor(private commentsService: CommentService) {}

  nestedCommentsEffect = effect((cleanupFn) => {
    if (this.isExpanded()) {
      this.nestedCommentsSubscription = this.commentsService
        .getComments(this.comment()._id)
        .subscribe({
          next: (comments) => {
            this.nestedComments.set(comments);
          },
        });
    }

    return cleanupFn(() => {
      this.nestedCommentsSubscription?.unsubscribe();
    });
  });

  toggleExpand() {
    this.isExpanded.update((prev) => !prev);
  }

  toggleReplying() {
    this.isReplying.update((prev) => !prev);

    if (this.isReplying()) this.isExpanded.set(true);
  }
}
