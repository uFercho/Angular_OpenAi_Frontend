import { environment } from "environments/environment.development"



export async function* prosConsDiscusserStreamUseCase( prompt: string, abortSignal: AbortSignal ) {

  try {

    const apiUrl: string = `${environment.backendApi}/gpt/pros-cons-discusser-stream`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo realizar la comparación');

    const reader = resp.body?.getReader();

    if ( !reader ) throw new Error('No se pudo generar el reader');

    const decoder = new TextDecoder();
    let text: string = '';

    while( true ) {
      const { value, done } = await reader.read();

      if ( done ) break;

      const decodedChunk = decoder.decode( value , { stream: true } );
      text += decodedChunk;
      yield text;
    }

    return text


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    return null

  }

}
