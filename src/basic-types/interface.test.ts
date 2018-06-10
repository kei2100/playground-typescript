import stringMatching = jasmine.stringMatching;

describe('define interface', () => {
  it('basic', () => {
    interface Name {
      firstName: string,
      lastName: string
    }

    const printName = function (name: Name): string {
      return `${name.firstName} ${name.lastName}`
    };

    const param = {firstName: 'Reggie', lastName: 'Miller', age: 33}; // 変数だと、ageのように関係ないパラメータも渡すことができてしまう.
    const name = printName(param);
    // const name2 = printName({firstName: 'Michael', lastName: 'Jordan', age: 35}); // リテラルだとエラーになる.

    expect(name).toBe('Reggie Miller');
  });

  it('optional property', () => {
    interface Name {
      firstName?: string,
      lastName: string
    }

    const printName = function (name: Name): string {
      return (name.firstName ? `${name.firstName} ` : '') + name.lastName;
    };

    expect(printName({lastName: 'jordan'})).toBe('jordan');
  });

  it('readonly property', () => {
    interface Point {
      readonly x: number;
      readonly y: number;
    }

    let p1: Point = {x: 10, y: 20};
    // p1.x = 5; // error!

    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a; // TypeScriptのReadonlyArray<T>の型は、 変更処理を行う全てのメソッドが削除されたArray<T>と同義
    // ro[0] = 12; // error!
    // ro.push(5); // error!
    // ro.length = 100; // error!

    // a = ro; // error!
    a = ro as number[]; // type assertionすればいける

    // NOTE: constとreadonlyの使い分けとしては、
    // - 変数で使うのならばconst
    // - プロパティで使うのならばreadonly
  });

  it('function types', () => {
    interface searchFunc {
      (src: string, sub: string): boolean;
    }

    const myFunc: searchFunc = function (s: string, b: string): boolean {
      return s.search(b) !== -1;
    };

    expect(myFunc('test', 's')).toBe(true);

    // 型は指定しなくても推測される
    const myFunc2: searchFunc = function (s, b) {
      return s.search(b) !== -1;
    };

    expect(myFunc2('foo', 'b')).toBe(false);
  });

  it('indexable types', () => {
    // a[10]や、obj['myprop']のように、「インデックス可能」な型に対してもinterfaceを定義することができる
    interface StringArray {
      [i: number]: string
    }

    const a: StringArray = ['zero', 'one'];
    expect(a[0]).toBe('zero');

    // a[0] = 0; // error!

    interface StringValues {
      [p: string]: string
    }

    const sv: StringValues = {'1': 'one', '2': 'two'};
    expect(sv['1']).toBe('one');
    // a[0] = 0;
    // ↑ error!. 数値のインデックスの値については、文字列インデックスの値型の少なくともサブタイプでないといけない。
    // なぜならjsは数値インデックスのアクセスは、内部的には文字列インデックスに変換して実行されるから。
    // また、文字列でなく、リテラルでのオブジェクトアクセスも、文字列インデックスの値型に縛られることに注意。
    // `sv['foo'] = 'bar'` は `sv.foo = 'bar'` に等しい。
  });

  it('define readonly object', () => {
    // indexable typesの応用
    interface ReadonlyStringValues {
      readonly [p: string]: string
    }

    const obj: ReadonlyStringValues = {
      a: 'a',
      b: 'b'
    };
    // obj.a = 'A'; // error!!
  });

  it('class types', () => {
    interface ClockInterface {
      currentTime: Date;

      setTime(d: Date);
    }

    class Clock implements ClockInterface {
      currentTime: Date;

      setTime(d: Date) {
        this.currentTime = d;
      }

      constructor(h: number, m: number) {
      }
    }
  });

  it('Difference between the static and instance sides of classes', () => {
    // classでinterfaceを実装した場合、型の影響を受けるのはインスタンス側であり、class側（静的側）ではない。
    // 例えばconstructorは静的メソッドに当たるので、classのinterfaceでこれをしばることはできない。
    // constructorの型を指定したい場合のイディオムはこちら。

    interface Person {
      firstName: string,
      lastName: string
    }

    interface PersonConstructor {
      new(firstName: string, lastName: string): Person
    }

    class StandardPerson implements Person {
      firstName: string;
      lastName: string;

      constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
    }

    const createPerson = function (ctor: PersonConstructor, firstName: string, lastName: string): Person {
      return new ctor(firstName, lastName);
    };

    const p = createPerson(StandardPerson, 'foo', 'bar');
    expect(p.firstName).toBe('foo');
    expect(p.lastName).toBe('bar');
  });

  it('hybrid types', () => {
    // functionとしてもオブジェクトとしても振る舞う型を定義してみる
    interface FullName {
      (): string,

      firstName: string,
      lastName: string
    }

    let fn;
    fn = <FullName>function (): string {
      return fn.firstName + ' ' + fn.lastName;
    };
    fn.firstName = 'foo';
    fn.lastName = 'bar';

    expect(fn()).toBe('foo bar');
  });

  it('interface extending class', () => {
    // interfaceでクラスをextendすることができる。
    // クラスをextendした場合、メンバを継承するが、その実装の中身は継承されない。
    // またprivateやprotectedのメンバも継承する。
    // これはprivateとprotectedのメンバを持つクラスを拡張したインターフェースを作成する際は、
    // インターフェースの型はそのクラス、またはそのクラスのサブクラスによってのみ実装可能であることを意味する
  });
});
