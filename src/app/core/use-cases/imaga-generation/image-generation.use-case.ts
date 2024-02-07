import { ImageGenerationResponse } from "@interfaces/image-generation.response";
import { environment } from "environments/environment.development"


export const imageGenerationUseCase = async ( prompt:string, originalImage?: string, maskImage?: string ) => {

  try {

    const apiUrl: string = `${environment.backendApi}/gpt/image-generation`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, originalImage, maskImage })
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo generar la imagen');

    const { url, revised_prompt }: ImageGenerationResponse = await resp.json();

    return {
      ok: true,
      url: url,
      alt: revised_prompt
    }


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)

    return {
      ok: false,
      url: '',
      alt: ''
    }

  }

}
