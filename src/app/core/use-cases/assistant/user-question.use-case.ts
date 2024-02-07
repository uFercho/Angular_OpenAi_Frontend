
import { UserQuestionResponse } from "@interfaces/user-question.response";
import { environment } from "environments/environment.development"


export const userQuestionUseCase = async ( threadId: string, question: string ) => {

  try {

    const apiUrl: string = `${environment.backendApi}/ai-assistant/user-question`;

    const resp = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ threadId, question })
      }
    );

    if ( !resp.ok ) throw new Error('No se pudo obtener las preguntas');

    const data: UserQuestionResponse[] = await resp.json();

    console.log('🚀 | userQuestionUseCase | data:', data)

    return data;


  } catch (error) {

    console.log('🚀 | orthographyUseCase | error:', error)
    throw new Error('No se puedo crear el thread');

  }

}
