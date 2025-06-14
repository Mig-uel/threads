import {
  Component,
  effect,
  input,
  signal,
  type OnDestroy,
} from '@angular/core';
import { type Subscription } from 'rxjs';
import type { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-comment',
  imports: [CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnDestroy {
  comment = input.required<Comment>();
  nestedComments = signal<Comment[]>([]);

  isExpanded = signal(false);
  isReplying = signal(false);
  isLoading = signal(false);

  replySub: Subscription | undefined;

  constructor(
    private commentsService: CommentService,
    private userService: UserService
  ) {}

  nestedCommentsEffect = effect((cleanupFn) => {
    let nestedCommentsSubscription: Subscription | undefined;

    if (this.isExpanded()) {
      this.isLoading.set(true);

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
    this.isExpanded.update((prev) => !prev);
  }

  toggleReplying() {
    this.isReplying.update((prev) => !prev);

    if (this.isReplying()) this.isExpanded.set(true);
  }

  createReply(event: { text: string }) {
    const { text } = event;
    const user = this.userService.getUserFromStorage();

    if (!user) return;

    this.replySub = this.commentsService
      .createComment({
        text,
        userId: user._id,
        parentId: this.comment()._id,
      })
      .subscribe({
        next: (reply) => this.nestedComments.update((prev) => [...prev, reply]),
      });
  }

  ngOnDestroy(): void {
    this.replySub?.unsubscribe();
  }
}
