import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject( OpenAiService );

  public abortSignal = signal<AbortController>(new AbortController());



  async handleMessage( prompt: string ){

    this.abortSignal().abort();
    this.abortSignal.set(new AbortController());

    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        text: prompt,
        isGpt: false
      },
      {
        text: '...',
        isGpt: true
      }
    ]);

    const stream = this.openAiService.prosConsDiscusserStream( prompt, this.abortSignal().signal );

    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamResponse( text );
    }

  }

  handleStreamResponse( text: string ) {

    this.messages().pop();
    const messages = this.messages();

    this.messages.set([
      ...messages,
      {
        text: text,
        isGpt: true
      }
    ])

  }
}
