import { Question } from "./question.model";

export interface Section {
    tittle: string,
    message: string,
    questions: Question[]
}
