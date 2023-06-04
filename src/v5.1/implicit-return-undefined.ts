// ✅ fine - we inferred that 'f1' returns 'void'
function f1() {
    // no returns
}

// ✅ fine - 'void' doesn't need a return statement
function f2(): void {
    // no returns
}

// ✅ fine - 'any' doesn't need a return statement
function f3(): any {
    // no returns
}

// before ts 5.1 => ❌ error!,
//   A function whose declared type is neither 'void' nor 'any' must return a value.
// since ts 5.1  => ✅ works fine
function f4(): undefined {
    // no returns
}
