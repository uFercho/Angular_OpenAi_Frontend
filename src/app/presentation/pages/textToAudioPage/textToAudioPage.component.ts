import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxSelectComponent, MessageEventWithSelect } from '@components/index';
import { Voice, Message } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);

  public voices = signal<Voice[]>([
    { id: 'nova', text: 'Nova' },
    { id: 'alloy', text: 'Alloy' },
    { id: 'echo', text: 'Echo' },
    { id: 'fable', text: 'Fable' },
    { id: 'onyx', text: 'Onyx' },
    { id: 'shimmer', text: 'Shimmer' },
  ]);

  public openAiService = inject( OpenAiService );


  handleMessageWithSelect( { prompt, selectedOption }: MessageEventWithSelect ) {

    this.isLoading.set(true);

    const promptMessage: string = `${selectedOption} - ${prompt}`

    this.messages.update( (prev) => [
      ...prev,
      {
        text: promptMessage,
        isGpt: false
      }
    ]);

    this.openAiService.textToAudio( prompt, selectedOption )
      .subscribe( ({ message, audioUrl }) => {

        this.isLoading.set(false);

        this.messages.update( (prev) => [
          ...prev,
          {
            text: message,
            isGpt: true,
            audioUrl: audioUrl,
          }
        ]);
      });

  }
}
