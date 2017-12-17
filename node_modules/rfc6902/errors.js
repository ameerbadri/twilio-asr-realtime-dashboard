export class MissingError extends Error {
    constructor(path) {
        super(`Value required at path: ${path}`);
        this.path = path;
        this.name = this.constructor.name;
    }
}
export class InvalidOperationError extends Error {
    constructor(op) {
        super(`Invalid operation: ${op}`);
        this.op = op;
        this.name = this.constructor.name;
    }
}
export class TestError extends Error {
    constructor(actual, expected) {
        super(`Test failed: ${actual} != ${expected}`);
        this.actual = actual;
        this.expected = expected;
        this.name = this.constructor.name;
        this.actual = actual;
        this.expected = expected;
    }
}
