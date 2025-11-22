import {object, string, ObjectSchema, InferType, number} from 'yup';


interface AnaliseErro {
    idAnalise?: string
    idUsuario?: string
    semanaReferencia? : string
    emocaoPredominante?: string
    resumo?: string
    recomendacao?: string
}


const analiseSchema : ObjectSchema<any, any> = object({
    idAnalise: number().nullable().default(null),
    idUsuario: number().required("Insira um id de um usuário válido").default(null),
    semanaReferencia: string().nullable().default(null),
    emocaoPredominante: string().nullable().default(null),
    resumo: string().nullable().default(null),
    recomendacao: string().nullable().default(null),
})

const idUsuarioSchema = string().required("Insira um id de um usuário válido").min(1, "Id do usuário não pode estar vazio");

type Analise = InferType<typeof analiseSchema>;

export { Analise, AnaliseErro, analiseSchema, idUsuarioSchema};