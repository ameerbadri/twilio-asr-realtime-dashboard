export declare class MissingError extends Error {
    path: string;
    constructor(path: string);
}
export declare class InvalidOperationError extends Error {
    op: string;
    constructor(op: string);
}
export declare class TestError extends Error {
    actual: any;
    expected: any;
    constructor(actual: any, expected: any);
}
