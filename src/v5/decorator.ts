class Person {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    @loggedMethod
    @bound
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

function loggedMethod(orig: any, context: ClassMethodDecoratorContext) {
    const method = String(context.name);
    return function (this: any, ...args: any[]) {
        console.log(`LOG: Entering method ${method}.`);
        const result = orig.call(this, ...args);
        console.log(`LOG: Exiting method ${method}.`);
        return result;
    }
}

function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = context.name;
    if (context.private) {
        throw new Error(`'bound' cannot decorate private properties like ${methodName as string}.`);
    }
    context.addInitializer(function () {
        // @ts-ignore
        this[methodName] = this[methodName].bind(this);
    });
}

// $ npx ts-node src/v5/decorator.ts
// LOG: Entering method greet.
// Hello, my name is Ron
// LOG: Exiting method greet.
const p = new Person("Ron");
p.greet();

// @bound により this が既にバインドされているので、同様に動作する
// LOG: Entering method greet.
// Hello, my name is Ron
// LOG: Exiting method greet.
const greet = p.greet;
greet();
