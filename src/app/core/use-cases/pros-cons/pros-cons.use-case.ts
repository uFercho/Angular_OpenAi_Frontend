import { ProsConsResponse } from "@interfaces/pros-cons.response";
import { environment } from "environments/environment.development"


export const prosConsDicusserUseCase = async ( prompt:string ) => {

  try {

    const apiUrl: string = `${environment.backendApi}/gpt/pros-cons-discusser`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo realizar la comparación');

    const data: ProsConsResponse = await resp.json();

    return {
      ok: true,
      ...data
    }


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    return {
      ok: false,
      role: '',
      content: 'No se pudo realizar la comparación'
    }

  }

}
