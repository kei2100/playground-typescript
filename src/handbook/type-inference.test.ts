describe('basic', () => {
  it('behavior', () => {
    const v = "string";
    expect(v.toUpperCase()).toBe('STRING'); // vはString型として推測されている
  });
});

describe('best common type', () => {
  it('primitive type', () => {
    const x = [1, 2, null];
    x.forEach(v => {
      !!v && console.log(v.toPrecision(2)); // Number.prototypeのメソッドが使える
    });
  });

  it('heterogeneous types', () => {
    const x = [1, "string", null];
    x.forEach(v => {
      // !!v && console.log(v.toPrecision(2)); // Error!! Number.prototypeのメソッドはそのままでは呼び出せない
    });
  });

  it('common super type', () => {
    class Animal {
      say(): string {
        return "";
      }
    }

    class Dog extends Animal {
      say(): string {
        return "bowwow";
      }
    }

    class Cat extends Animal {
      say(): string {
        return "meow";
      }
    }

    const animals = [new Dog, new Cat()];
    animals.forEach(a => {
      console.log(a.say())
    });
  });

  it('compatible types', () => {
    class Dog {
      say(): string {
        return "bowwow";
      }
    }

    class Cat {
      say(): string {
        return "meow";
      }
    }

    const animals = [new Dog(), new Cat()];
    animals.forEach(a => {
      console.log(a.say()) // これも問題なし
    });
  });
});

describe('contextual type', () => {
  it('behavior', () => {
    interface myFunc {
      (v: string)
    }

    let myf: myFunc;
    myf = function (v) {
      console.log(v.toUpperCase()); // vがstringであることが、左辺から与えられている
    };

    myf('myFunc');
  });
});