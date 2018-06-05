describe('define array', () => {
  it('basic', () => {
    const l1: number[] = [1, 2, 3];
    const l2: Array<number> = [1, 2, 3]; // 同義
    expect(l1).toEqual(l2);
  });
});

describe('define tuple', () => {
  it('basic', () => {
    let tuple: [string, number];
    tuple = ['foo', 1];
    expect(tuple[0]).toBe('foo');
    expect(tuple[1]).toBe(1);
  });
});

describe('define enum', () => {
  it('basic', () => {
    enum Color {Red, Green, Blue}

    let c: Color = Color.Blue;
    expect(c).toBe(Color.Blue);
    expect(c).toBe(2); // 何も指定しないとenumは0から連番になる
  });

  it('number to enum string, and to enum', () => {
    enum Color {Red, Green, Blue}

    expect(Color[1]).toBe('Green');
    expect(Color['Green']).toBe(Color.Green);
  });
});

describe('define void', () => {
  it('basic', () => {
    const f = function (): void {
      // return 'a'; // voidなのでreturn stringできない
      if (1 === 1) {
        return null;
      } else {
        return undefined; // null or undefined ok
      }
    };
    // no expectation
    f();
  });

  it('meaningless', () => {
    const m1: void = undefined; // voidの場合, null or undefinedしか割り当てることはできない
    const m2: void = null;
    expect(m1).toBe(undefined);
    expect(m2).toBe(null);
  });
});

describe('define never', () => {
  // neverを返す関数は、終点への到達を不可にしなければいけません
  function error(message: string): never {
    throw new Error(message);
  }

  // 戻り値はneverと推論されます
  function fail() {
    return error("Something failed");
  }

  // neverを返す関数は、終点への到達を不可にしなければいけません
  function infiniteLoop(): never {
    while (true) {
    }
  }
  // no expectations
});


describe('type assertions', () => {
  it('angle bracket syntax', () => {
    const v : any = 'test';
    expect((<string>v).length).toBe(4);
  });

  it('as syntax', () => {
    const v : any = 'test';
    expect((v as string).length).toBe(4);
  });

  //  どちらを選択するかは、ほとんど好みの問題になりますが、 JSXを使用するTypeScriptではas形式のアサーションしか使用できません。
});
