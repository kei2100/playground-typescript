import EmptyFunction = jest.EmptyFunction;

describe('basics', () => {
  it('behaves', () => {
    interface Named {
      name: string;
    }
    class Person {
      name: string = "";
    }

    let named: Named;
    named = new Person(); // name: string を満たしているので問題なし

    class PersonWithAge {
      name: string = "";
      age: number = 0;
    }
    let person: Person;
    person = new PersonWithAge()  // class同士でも, name: string を満たしているので問題なし
  });
});

describe('function compatibility', () => {
  it('behaves', () => {
    let x!: (a: number) => 0;
    let y: (a: number, b: string) => 0;

    y = x; // ok. yの実体はxとなるが、この場合、bはxでは無視されると言えるので大丈夫（jsにおいて、引数の無視はもともと可能）
    // x = y; // error!! パラメータより少ない引数で呼び出すことはできない。
  });
});

describe('generics', () => {
  it('behaves', () => {
    interface Empty<T> {
    }

    let x: Empty<string>;
    let y!: Empty<string>;
    x = y; // ok. Tが意識されるような使い方をしないため。

    interface NotEmpty<T> {
      func(): T;
    }

    let xx: NotEmpty<string>;
    let yy: NotEmpty<number>;
    // xx = yy; // error!!
  });
});
