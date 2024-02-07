import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './imageGenerationPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {

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

    this.openAiService.imageGeneration( prompt )
      .subscribe( (resp) => {

        this.isLoading.set(false);

        this.messages.update( (prev) => [
          ...prev,
          {
            text: resp.alt,
            isGpt: true,
            imageInfo: resp
          }
        ]);
      })

  }
}
