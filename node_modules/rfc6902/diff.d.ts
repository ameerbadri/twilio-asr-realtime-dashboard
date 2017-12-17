import { Pointer } from './pointer';
/**
All diff* functions should return a list of operations, often empty.

Each operation should be an object with two to four fields:
* `op`: the name of the operation; one of "add", "remove", "replace", "move",
  "copy", or "test".
* `path`: a JSON pointer string
* `from`: a JSON pointer string
* `value`: a JSON value

The different operations have different arguments.
* "add": [`path`, `value`]
* "remove": [`path`]
* "replace": [`path`, `value`]
* "move": [`from`, `path`]
* "copy": [`from`, `path`]
* "test": [`path`, `value`]

Currently this only really differentiates between Arrays, Objects, and
Everything Else, which is pretty much just what JSON substantially
differentiates between.
*/
export interface AddOperation {
    op: 'add';
    path: string;
    value: string;
}
export interface RemoveOperation {
    op: 'remove';
    path: string;
}
export interface ReplaceOperation {
    op: 'replace';
    path: string;
    value: string;
}
export interface MoveOperation {
    op: 'move';
    from: string;
    path: string;
}
export interface CopyOperation {
    op: 'copy';
    from: string;
    path: string;
}
export interface TestOperation {
    op: 'test';
    path: string;
    value: string;
}
export declare type Operation = AddOperation | RemoveOperation | ReplaceOperation | MoveOperation | CopyOperation | TestOperation;
export declare function isDestructive({op}: Operation): boolean;
/**
subtract(a, b) returns the keys in `a` that are not in `b`.
*/
export declare function subtract<A, B>(a: A, b: B): string[];
/**
intersection(objects) returns the keys that shared by all given `objects`.
*/
export declare function intersection<T>(objects: T[]): string[];
export declare function objectType(object: any): string;
/**
Array-diffing smarter (levenshtein-like) diffing here

To get from the input ABC to the output AZ we could just delete all the input
and say "insert A, insert Z" and be done with it. That's what we do if the
input is empty. But we can be smarter.

          output
               A   Z
               -   -
          [0]  1   2
input A |  1  [0]  1
      B |  2  [1]  1
      C |  3   2  [2]

1) start at 0,0 (+0)
2) keep A (+0)
3) remove B (+1)
4) replace C with Z (+1)

if input (source) is empty, they'll all be in the top row, just a bunch of
additions. If the output is empty, everything will be in the left column, as a
bunch of deletions.
*/
export declare function diffArrays<T>(input: T[], output: T[], ptr: Pointer): Operation[];
export declare function diffObjects(input: any, output: any, ptr: Pointer): Operation[];
export declare function diffValues(input: any, output: any, ptr: Pointer): Operation[];
export declare function diffAny(input: any, output: any, ptr: Pointer): Operation[];
