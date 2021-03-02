export interface Input {
    id: number | null,
    message: string,
    type: 'Check'|'Text'|'TextArea'|'MultipleChoice',
    response: any
}
