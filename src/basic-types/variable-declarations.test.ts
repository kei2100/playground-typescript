describe('array destructuring', () => {
  it('basic', () => {
    const vv = [1, 2];
    const [v1, v2] = vv;

    expect(v1).toBe(1);
    expect(v2).toBe(2);
  });

  it('swapping', () => {
    let [v1, v2] = [1, 2];
    [v2, v1] = [v1, v2];

    expect(v1).toBe(2);
    expect(v2).toBe(1);
  });

  it('function args', () => {
    const swap = function ([f, s]: [number, number]): [number, number] {
      return [s, f]
    };
    const [v1, v2] = swap([1, 2]);

    expect(v1).toBe(2);
    expect(v2).toBe(1);
  });

  it('rest parameters', () => {
    const [v1, ...rest] = [1, 2, 3, 4];
    expect(v1).toBe(1);
    expect(rest).toEqual([2, 3, 4]);

    const [v2] = [2, 3, 4]; // 残りの要素を無視
    expect(v2).toBe(2);

    const [, v3, v4] = [2, 3, 4]; // 前半の要素を無視
    expect(v3).toBe(3);
    expect(v4).toBe(4);
  });
});

describe('object destructuring', () => {
  it('destruct to variable', () => {
    const o = {a: 'a', b: 'b', c: 'c'};
    const {a, b} = o;

    expect(a).toBe('a');
    expect(b).toBe('b');
  });

  it('rest parameter', () => {
    const o = {a: 'a', b: 'b', c: 'c'};
    const {a, ...o2} = o;

    expect(a).toBe('a');
    expect(o2).toEqual({b: 'b', c: 'c'});
  });

  it('change property name', () => {
    const o = {a: 'a', b: 'b'};
    const {a: newA, b: newB} = o; // 紛らわしいがnewA, newBはここでは型を表さない. 型の場合は「cost {a, b} : {a: string, b: string} = o」となる

    expect(newA).toBe('a');
    expect(newB).toBe('b');
  });
});

describe('default value', () => {
  const f = function (a: number, b: number = 2): number {
    return a * b;
  };

  const res = f(3);
  expect(res).toBe(6);
});
