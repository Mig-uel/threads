import { Component, input } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  placeholder = input<string>('Share your thoughts...');
  buttonText = input<string>('Create Post');
}
