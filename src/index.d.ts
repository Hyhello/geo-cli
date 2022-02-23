interface IOptionConfig {
    argv: string;
    description: string;
    default?: string;
    format?: (...args: any[]) => any
}

interface IPromptConfig {
    type: string;
    name: string;
    message: string;
    filter?: (...args: any[]) => any
}
