import { Input } from "./input.model";

export interface Question {
    obligatory: boolean,
    tittle: string,
    type: 'List' | 'Text' | 'MultipleChoice',
    inputs: Input[] | null
}
