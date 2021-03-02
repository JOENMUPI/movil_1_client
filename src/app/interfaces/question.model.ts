import { Input } from "./input.model";

export interface Question {
    obligatory: boolean,
    tittle: string,
    inputs: Input[] | null
}
