
import { CreateThreadResponse } from "@interfaces/create-thread.response";
import { environment } from "environments/environment.development"


export const createThreadUseCase = async () => {

  try {

    const apiUrl: string = `${environment.backendApi}/ai-assistant/create-thread`;

    const resp = await fetch( apiUrl, { method: 'POST', } );

    if ( !resp.ok ) throw new Error('No se puedo crear el thread');

    const data: CreateThreadResponse = await resp.json();

    console.log('🚀 | createThreadUseCase | data:', data)

    return data


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    throw new Error('No se puedo crear el thread');

  }

}
