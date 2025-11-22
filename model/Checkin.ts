import {object, string, ObjectSchema, InferType, number} from 'yup';


interface CheckinErro {
    idCheckin?: string
    idUsuario?: string
    emocao? : string
    texto?: string
    analiseSentimento?: string
    respostaGerada?: string
}


const checkinSchema : ObjectSchema<any, any> = object({
    idCheckin: number().nullable().default(null),
    idUsuario: number().required(),
    emocao: string().required(),
    texto: string().required("Insira descrição de seu estado emocional"),
    analiseSentimento: string().nullable().default(null),
    respostaGerada: string().nullable().default(null),
})

type Checkin = InferType<typeof checkinSchema>;

export { Checkin, CheckinErro, checkinSchema};