
    
export {}
declare global {

    // type Defined = boolean | string | number | null | symbol | bigint | { [key: string]: Defined } | Defined[] | function(): unknown;
    // type NonNull = boolean | string | number | symbol | bigint |  { [key: string]: NonNull } | NonNull[] | function(): unknown;
    // type JsonValue = boolean | string | number | { [x: string]: JsonValue } | JsonValue[];
}

// export {
//     Defined,
//     NonNull,
//     JsonValue
// }

// //   type DefinedValue =
// //     | boolean
// //     | string
// //     | number
// //     | null
// //     | { [key: string]: DefinedValue }
// //     | Array<DefinedValue>;

//   type Defined = DefinedValue;
//   type NotUndefined = Defined;
//   type NotNull =
//     | boolean
//     | string
//     | number
//     | { [key: string]: NotNull }
//     | Array<NotNull>;

// interface DefinedObject {
//     [key: string]: Defined
// }
// interface DefinedArray extends Array<Defined> { }

//     type NonNull = string | number | bigint | boolean | { [x: string]: NonNullDefined } | Array<NonNullDefined> | symbol | function;
//     type DynamicObject = { [x: string]: Defined };
//     type DynamicArray = Array<Defined>;
//   type JsonValue =
//     | string
//     | number
//     | boolean
//     | { [x: string]: JsonValue }
//     | Array<JsonValue>;
//
//   Now declare things that go in the global namespace,
//   or augment existing declarations in the global namespace.
// type Defined = T extends null | undefined ? never : T
