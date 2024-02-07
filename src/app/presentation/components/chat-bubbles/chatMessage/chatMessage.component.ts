import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageImageInfo } from '@interfaces/message';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    MarkdownModule,
  ],
  templateUrl: './chatMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input({ required: true }) text!: string;
  @Input() audioUrl?: string;
  @Input() imageInfo?: MessageImageInfo;
}
