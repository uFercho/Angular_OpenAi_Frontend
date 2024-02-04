import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MessageEventWithFile, MessageEventWithSelect, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    //TextMessageBoxSelectComponent,
    //TextMessageBoxFileComponent,
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public openAiService = inject( OpenAiService );



  handleMessage( prompt: string ){
    console.log('🚀 | OrthographyPageComponent | handleMessage | prompt:', prompt)

  }

  // handleMessageWithFile( { prompt, file }: MessageEventWithFile ){
  //   console.log('🚀 | OrthographyPageComponent | handleMessageWithFile | file:', file)
  //   console.log('🚀 | OrthographyPageComponent | handleMessage | prompt:', prompt)

  // }

  // handleMessageWithSelect( { prompt, selectedOption }: MessageEventWithSelect ) {
  // console.log('🚀 | OrthographyPageComponent | handleMessageWithSelect | selectedOption:', selectedOption)
  // console.log('🚀 | OrthographyPageComponent | handleMessageWithSelect | prompt:', prompt)

  // }
}
