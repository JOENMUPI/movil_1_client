import { Section } from "./section.model";

export interface Form {
    tittle: string | number,
    sections: Section[] | null
}
