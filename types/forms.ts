export interface Form {
    id: number;
    name: string;
    description?: string;
    schema: {};
    uischema: {};
}

export interface FormState {
    success?: boolean | number;
    error?: string;
    redirect?: string;
}
