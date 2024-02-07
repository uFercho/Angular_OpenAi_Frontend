import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxFileComponent, MessageEventWithFile } from '@components/index';
import { Message } from '@interfaces/message';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject( OpenAiService );

  handleMessageWithFile( { prompt, file }: MessageEventWithFile ){

    this.isLoading.set(true);

    const promptMessage: string = prompt ?? file.name ?? 'Procesa el audio';

    this.messages.update( (prev) => [
      ...prev,
      {
        text: promptMessage,
        isGpt: false
      }
    ]);

    this.openAiService.audioToText( file, promptMessage )
      .subscribe( (resp) => {

        this.isLoading.set(false);

        if ( !resp.data ) return;

        const promptMessage: string = `
### Transcripción:
__Duración:__ ${ Math.round( resp.data.duration ) } segundos.

## El Texto es:
${ resp.data.text } `;

        this.messages.update( (prev) => [
          ...prev,
          {
            text: promptMessage,
            isGpt: true
          }
        ]);

        resp.data.segments.forEach( segment => {
          const segmentMessage = `
__De ${ Math.round( segment.start ) } a ${ Math.round( segment.end ) } segundos.__
${ segment.text }`;

          this.messages.update( (prev) => [
            ...prev,
            {
              text: segmentMessage,
              isGpt: true
            }
          ]);
        })
      })



  }
}
