// $ npx ts-node src/v5/decorator.ts
// LOG: Entering method.
// Hello, my name is Ron
// LOG: Exiting method.

class Person {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

function loggedMethod(orig: any, _context: any) {
    return function (this: any, ...args: any[]) {
        console.log("LOG: Entering method.");
        const result = orig.call(this, ...args);
        console.log("LOG: Exiting method.");
        return result;
    }
}

const p = new Person("Ron");
p.greet();
