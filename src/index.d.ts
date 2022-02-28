interface IOptionConfig {
    argv: string;
    description: string;
    format?: (...args: any[]) => any;
    default?: string;
}

interface IPromptConfig {
    type: string;
    name: string;
    message: string;
    filter?: (...args: any[]) => any
}

interface IGeo {
    input: string | string[];
    output: string | string[];
    pretty: boolean | number;
    exclude: string[]
}

interface ILogs {
    [propName: string]: string
};
