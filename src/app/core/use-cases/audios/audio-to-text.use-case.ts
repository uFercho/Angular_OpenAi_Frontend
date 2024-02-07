import { AudioToTextResponse } from "@interfaces/audio-to-text.response";
import { environment } from "environments/environment.development";




export const audioToTextUseCase = async ( audioFile: File, prompt?: string ) => {

  try {

    const formData = new FormData();

    formData.append( 'file', audioFile );

    if ( prompt ) formData.append( 'prompt', prompt );

    const apiUrl: string = `${environment.backendApi}/gpt/audio-to-text`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        body: formData
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo procesar el audio');

    const data: AudioToTextResponse = await resp.json();

    return {
      ok: true,
      message: prompt ?? '',
      data: data
    }

  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    return {
      ok: false,
      message: 'No se pudo procesar el audio',
      data: null,
    }

  }
}
