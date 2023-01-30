export interface ErrorResponse {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      Error[];
}

export interface Error {
    code:        string;
    description: string;
}

export interface Headers {
    normalizedNames: NormalizedNames;
    lazyUpdate:      null;
}

export interface NormalizedNames {
}