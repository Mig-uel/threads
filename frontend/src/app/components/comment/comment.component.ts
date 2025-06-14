import { Component, input, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import type { Comment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  imports: [CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  comment = input.required<Comment>();
  isExpanded = signal(false);
  isReplying = signal(false);

  toggleExpand() {
    this.isExpanded.update((prev) => !prev);
  }

  toggleReplying() {
    this.isReplying.update((prev) => !prev);

    // expand replies as well
    if (this.isReplying()) this.isExpanded.set(true);
  }
}
