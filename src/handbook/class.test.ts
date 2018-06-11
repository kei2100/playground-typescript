describe('public protected private', () => {
  class Animal {
    // private修飾子はそのクラス内からのみアクセス可能
    private name: string;

    // protected修飾子は継承したクラスからもアクセス可能
    protected say: string;

    constructor(name: string) {
      this.name = name;
    }

    // 何もつけないとdefaultではpublicになる
    getName(): string {
      return this.name
    }

    getSay(): string {
      return this.say;
    }
  }

  class Dog extends Animal {
    constructor() {
      super('dog');
      this.say = 'bowwow';
    }
  }

  it('behaves', () => {
    const d = new Dog();
    expect(d.getName()).toBe('dog');
    expect(d.getSay()).toBe('bowwow');
  });
});

describe('parameter properties', () => {
  class Human {
    // 内部的にthis.name = nameをやってくれる
    constructor(private name: string) {
    }

    getName(): string {
      return this.name;
    }
  }

  it('behaves', () => {
    expect(new Human('foo').getName()).toBe('foo');
  });
});

describe('getter setter', () => {
  class Human {
    constructor(private firstName: string, private lastName: string) {
    }

    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  it('behaves', () => {
    expect(new Human('foo', 'bar').fullName).toBe('foo bar');
  });
});

describe('static member', () => {
  class Singleton {
    static getInstance(): Singleton {
      return new Singleton();
    }

    private constructor() {
    }
  }

  it('behaves', () => {
    expect(Singleton.getInstance() instanceof Singleton).toBe(true);
  });
});

describe('abstract class', () => {
  abstract class Animal {
    abstract get say(): string
  }

  class Dog extends Animal {
    get say(): string {
      return 'bowwow';
    };
  }

  it('behaves', () => {
    expect(new Dog().say).toBe('bowwow');
  });
});

describe('using class as an interface', () => {
  class Point {
    x: number;
    y: number;
  }

  // class宣言はコンストラクタ関数と、そのインスタンスを表す型という2つのものを作成するので、
  // 作成された型をinterfaceでextendsすることが可能
  interface Point3D extends Point {
    z: number
  }

  it('behaves', () => {
    const p: Point3D = {x: 10, y: 8, z: 5};
    expect(p).toEqual({x: 10, y: 8, z: 5});
  });
});
