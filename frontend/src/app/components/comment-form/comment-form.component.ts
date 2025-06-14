import { Component, input, output } from '@angular/core';

// TODO => implement FormsModule
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  placeholder = input<string>('Share your thoughts...');
  buttonText = input<string>('Create Post');

  formSubmitted = output<{ text: string }>();

  formSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const textAreaElement = form.elements.namedItem(
      'comment'
    ) as HTMLTextAreaElement;

    const commentText = textAreaElement.value;

    if (!commentText.trim()) {
      form.reset();
      return;
    }

    this.formSubmitted.emit({
      text: commentText,
    });

    form.reset();
  }
}
