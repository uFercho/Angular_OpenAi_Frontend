import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, GptMessageEditableImageComponent } from '@components/index';
import { Message } from '@interfaces/message';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageEditableImageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal<boolean>(false);
  public originalImage = signal<string|undefined>(undefined);
  public maskImage = signal<string|undefined>(undefined);


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

    this.openAiService.imageGeneration( prompt, this.originalImage(), this.maskImage() )
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

  generateVariation() {

    if ( !this.originalImage() ) return;

    this.isLoading.set(true);

    this.openAiService.imageVariation( this.originalImage()! )
      .subscribe( (resp) => {

        this.isLoading.set(false);

        this.messages.update( (prev) => [
          ...prev,
          {
            text: 'Generando varición',
            isGpt: true,
            imageInfo: {
              url: resp.url,
              alt: 'Generando varición'
            }
          }
        ]);
      })

  }

  handleImageChange( maskImage: string, originalImage: string ) {

    this.originalImage.set( originalImage );
    this.maskImage.set( maskImage );


    console.log({ maskImage, originalImage })

  }
}
