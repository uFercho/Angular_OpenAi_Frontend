import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, MessageEventWithSelect, TextMessageBoxSelectComponent } from '@components/index';
import { Language, Message } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject( OpenAiService );

  public languages = signal<Language[]>([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  handleMessageWithSelect( { prompt, selectedOption }: MessageEventWithSelect ) {

    this.isLoading.set(true);

    const promptMessage: string = `Traduce a ${selectedOption}: ${prompt}`

    this.messages.update( (prev) => [
      ...prev,
      {
        text: promptMessage,
        isGpt: false
      }
    ]);

    this.openAiService.translate( prompt, selectedOption )
      .subscribe( ({ content }) => {

        this.isLoading.set(false);

        this.messages.update( (prev) => [
          ...prev,
          {
            text: content,
            isGpt: true,
          }
        ]);
      })

  }
}
