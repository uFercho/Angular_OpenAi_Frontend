import { OrthographyResponse } from "@interfaces/orthography.response";
import { environment } from "environments/environment.development"


export const orthographyUseCase = async ( prompt:string ) => {

  try {

    const apiUrl: string = `${environment.backendApi}/orthography-check`;

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

    if ( !resp.ok ) throw new Error('No se pudo realizar la correción');

    const data: OrthographyResponse = await resp.json();

    return {
      ok: true,
      ...data
    }


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la correción'
    }

  }

}
