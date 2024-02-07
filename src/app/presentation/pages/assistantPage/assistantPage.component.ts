import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistantPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent implements OnInit {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public thread = signal<string|undefined>(undefined);

  public openAiService = inject( OpenAiService );


  ngOnInit(): void {
    this.openAiService.createThread()
      .subscribe( id => this.thread.set( id ) );
  }

  handleMessage( question: string ) {

    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        text: question,
        isGpt: false
      }
    ]);

    this.openAiService.userQuestion( this.thread()!, question )
      .subscribe( (replies) => {

        this.isLoading.set(false);

        for (const reply of replies) {
          for (const message of reply.content) {

            this.messages.update( (prev) => [
              ...prev,
              {
                text: message,
                isGpt: reply.role === 'assistant' ? true : false,
              }
            ]);

          }

        }

      })

  }
}
