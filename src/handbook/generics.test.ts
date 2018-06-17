describe('basic', () => {
  it('define', () => {
    function returnSelf<T>(arg: T): T {
      return arg;
    }

    const o = {};
    expect(returnSelf(o)).toBe(o);
    expect(returnSelf<object>(o)).toBe(o); // explicit type
  });

  it('array', () => {
    function returnSelf<T>(array: T[]): T[] {
      return array;
    }

    function returnSelf2<T>(array: Array<T>): Array<T> {
      return array;
    }

    const arr: number[] = [1, 2, 3];
    expect(returnSelf(arr)).toBe(arr);
    expect(returnSelf2(arr)).toBe(arr);
  });
});

describe('generics types', () => {
  it('basic', () => {
    const returnSelf: <T>(arg: T) => T = function <T>(arg: T): T {
      return arg;
    };

    // Tは別名でもよい
    const returnSelf2: <U>(arg: U) => U = returnSelf;
    // オブジェクトリテラル型定義
    const returnSelf3: {<T>(arg: T): T} = returnSelf2;

    expect(returnSelf3('a')).toBe('a');
  });

  it('define interface', () => {
    interface ReturnSameType {
      <T>(arg: T): T
    }

    const returnSelf: ReturnSameType = function (arg) {
       return arg;
    };

    const o = {};
    expect(returnSelf(o)).toBe(o);

    // こういった定義も可能
    interface ReturnSameType2<T> {
      (arg: T): T
    }
    const repeatDouble: ReturnSameType2<string> = function (arg: string) {
      return arg + arg;
    };
    expect(repeatDouble('a')).toBe('aa');
  });

  it('define class', () => {
    class Holder<T> {
      constructor(private obj: T) {
      }

      getObj(): T {
        return this.obj;
      }

      // 静的メンバはクラスの型パラメータを使用することはできない
    }

    const obj = {};
    const h = new Holder(obj);
    expect(h.getObj()).toBe(obj);
  });
});

describe('extends', () => {
  function cp<S, D extends S>(src: S, dst: D) {
    for (let p in src) {
      dst[p] = src[p];
    }
  }

  const src = {a: 'A', b: 'B'};
  const dst = {a: 'a', b: 'b', c: 'c'};
  cp(src, dst);
  expect(dst.a).toBe('A');
  expect(dst.b).toBe('B');
  expect(dst.c).toBe('c');
});

describe('using class types in generics', () => {
  // newでT型のインスタンスを返すcを引数に受ける
  function createInstance<T>(c: {new(): T}): T {
    return new c();
  }

  class MyClass {
  }

  const o = createInstance(MyClass);
  expect(o instanceof MyClass).toBe(true);
});
