import { Injectable } from '@angular/core';
import { audioToTextUseCase } from '@use-cases/audios/audio-to-text.use-case';
import { createThreadUseCase, imageGenerationUseCase, imageVariationUseCase, orthographyUseCase, prosConsDicusserUseCase, prosConsDiscusserStreamUseCase, textToAudioUseCase, translateUseCase, userQuestionUseCase } from '@use-cases/index';
import { Observable, from, map, of, tap } from 'rxjs';

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

  audioToText( file: File, prompt?: string ) {
    return from( audioToTextUseCase( file, prompt ) );
  }

  imageGeneration( prompt: string, originalImage?: string, maskImage?: string ) {
    return from( imageGenerationUseCase( prompt, originalImage, maskImage ) );
  }

  imageVariation( originalImage: string ) {
    return from( imageVariationUseCase( originalImage ) );
  }

  createThread(  ):Observable<string> {

    const thread = localStorage.getItem('thread');

    if ( thread ) return of( thread );

    return from( createThreadUseCase() ).
            pipe(
              tap( ({ id }) => localStorage.setItem( 'thread', id ) ),
              map( ({ id }) => id )
            )
  }

  userQuestion( threadId: string, question: string ) {
    return from( userQuestionUseCase( threadId, question ) );
  }

}
