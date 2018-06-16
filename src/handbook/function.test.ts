describe('function types', () => {
  it('full type', () => {
    const f: (v: number) => string =
      function (v: number): string {
        return v.toString();
      };
    expect(f(1)).toBe('1');
  });

  it('inferring the types', () => {
    const f = function (v: number): string {
      return v.toString()
    };
    expect(f(1)).toBe('1');
  });
});

describe('this parameter', () => {
  it('use void this', () => {
    // この関数内でthisを使用できなくする。（thisの型がvoidになる）
    function f(this: void) {
      // no expectations
    }
    f();
  });

  it('define type of this', () => {
    interface Multiply {
      x: number,
      y: number,
      multiply(this: Multiply): number
    }

    const m: Multiply = {
      x: 2,
      y: 3,
      multiply(): number {
        return this.x * this.y;
      }
    };

    expect(m.multiply()).toBe(6);
  });
});

describe('function overload', () => {
  // number <-> string 変換、あるいは string <-> number 変換する関数
  function num2StrOrStr2Num(x: number): string;
  function num2StrOrStr2Num(x: string): number;
  // 関数定義本体
  function num2StrOrStr2Num(x) {
    if (typeof x === 'string') {
      return parseInt(x, 10);
    }
    if (typeof x === 'number') {
      return x.toString();
    }
  }

  expect(num2StrOrStr2Num(1) === '1').toBe(true);
  expect(num2StrOrStr2Num('1') === 1).toBe(true);
});
