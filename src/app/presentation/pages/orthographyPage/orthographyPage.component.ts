import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent, MessageEventWithFile, MessageEventWithSelect, GptMessageOrthographyComponent } from '@components/index';
import { Message } from '@interfaces/message';
import { OpenAiService } from '../../services/openai.service';


@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrthographyComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject( OpenAiService );



  handleMessage( prompt: string ){

    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        text: prompt,
        isGpt: false
      }
    ]);

    this.openAiService.orthographyCheck( prompt )
      .subscribe( (resp) => {

        this.isLoading.set(false);

        this.messages.update( (prev) => [
          ...prev,
          {
            text: resp.message,
            isGpt: true,
            info: resp
          }
        ]);
      })

  }
}
