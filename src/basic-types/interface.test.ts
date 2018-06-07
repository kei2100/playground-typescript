describe('define interface', () => {
  it('basic', () => {
    interface Name {
      firstName: string,
      lastName: string
    }

    const printName = function (name: Name): string {
      return `${name.firstName} ${name.lastName}`
    };

    const param = {firstName: 'Reggie', lastName: 'Miller', age: 33}; // ageのように関係ないパラメータも渡すことができる.
    const name = printName(param);

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
});
