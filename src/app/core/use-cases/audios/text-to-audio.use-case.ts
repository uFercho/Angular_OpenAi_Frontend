import { OrthographyResponse } from "@interfaces/orthography.response";
import { environment } from "environments/environment.development"


export const textToAudioUseCase = async ( prompt:string, voice: string ) => {

  try {

    const apiUrl: string = `${environment.backendApi}/gpt/text-to-audio`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, voice })
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo generar el audio');

    const audioFile = await resp.blob();
    const audioUrl = URL.createObjectURL( audioFile );

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    }


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    return {
      ok: false,
      message: 'No se pudo generar el audio',
      audioUrl: '',
    }

  }

}
