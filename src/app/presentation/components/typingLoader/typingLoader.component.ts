import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  standalone: true,
  imports: [],
  templateUrl: './typingLoader.component.html',
  styleUrl: './typingLoader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingLoaderComponent { }
