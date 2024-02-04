import { TranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment.development"


export const translateUseCase = async ( prompt:string, lang: string ) => {

  try {

    const apiUrl: string = `${environment.backendApi}/translate`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, lang })
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo realizar la traducción');

    const data: TranslateResponse = await resp.json();

    return {
      ok: true,
      ...data
    }


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    return {
      ok: false,
      role: '',
      content: 'No se pudo realizar la traducción'
    }

  }

}
