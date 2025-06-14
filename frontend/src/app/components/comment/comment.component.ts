import { Component, signal } from '@angular/core';
import { CommentFormComponent } from "../comment-form/comment-form.component";

@Component({
  selector: 'app-comment',
  imports: [CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  isExpanded = signal(false);
  isReplying = signal(false);

  toggleExpand() {
    this.isExpanded.update((prev) => !prev);
  }

  toggleReplying() {
    this.isReplying.update((prev) => !prev);

    // expand replies as well
    if (this.isReplying()) this.isExpanded.update((prev) => true);
  }
}
