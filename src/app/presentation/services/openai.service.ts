import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsDicusserUseCase, prosConsDiscusserStreamUseCase, textToAudioUseCase, translateUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  orthographyCheck( prompt: string ) {
    return from( orthographyUseCase( prompt ) );
  }

  prosConsDiscusser( prompt: string ) {
    return from( prosConsDicusserUseCase( prompt ) );
  }

  prosConsDiscusserStream( prompt: string, abortSignal: AbortSignal ) {
    return prosConsDiscusserStreamUseCase( prompt, abortSignal );
  }

  translate( prompt: string, lang: string ) {
    return from( translateUseCase( prompt, lang ) );
  }

  textToAudio( prompt: string, voice: string ) {
    return from( textToAudioUseCase( prompt, voice ) );
  }

}
