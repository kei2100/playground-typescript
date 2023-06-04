
// TypeScript 5.1 now allows completely unrelated types for get and set accessor properties, provided that they have explicit type annotations.
// And while this version of TypeScript does not yet change the types for these built-in interfaces,
// CSSStyleRule can now be defined in the following way:
interface CSSStyleRule {
    // ...

    /** Always reads as a `CSSStyleDeclaration` */
    get styleValue(): CSSStyleDeclaration;

    /** Can only write a `string` here. */
    set styleValue(newValue: string);

    // ...
}
