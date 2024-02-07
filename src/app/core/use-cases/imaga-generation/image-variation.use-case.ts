import { ImageVariationResponse } from "@interfaces/image-variation.response";
import { environment } from "environments/environment.development"


export const imageVariationUseCase = async ( originalImage: string ) => {

  try {

    const apiUrl: string = `${environment.backendApi}/gpt/image-variation`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ baseImage: originalImage })
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo generar la imagen');

    const data: ImageVariationResponse = await resp.json();

    return {
      ok: true,
      url: data.url
    }


  } catch (error) {

    return {
      ok: false,
      url: ''
    }

  }

}
