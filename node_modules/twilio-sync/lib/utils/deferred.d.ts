declare class Deferred<T> {
    private _promise;
    private _resolve;
    private _reject;
    current: T;
    constructor();
    readonly promise: Promise<T>;
    update(value: T): void;
    set(value: T): void;
    fail(e: any): void;
}
export { Deferred };
