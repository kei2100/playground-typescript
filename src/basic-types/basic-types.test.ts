test('define array', () => {
  const l1: number[] = [1, 2, 3];
  const l2: Array<number> = [1, 2, 3]; // 同義

  expect(l1).toEqual(l2);
});

test('define tuple', () => {
  let tuple: [string, number];
  tuple = ['foo', 1];

  expect(tuple[0]).toBe('foo');
  expect(tuple[1]).toBe(1);
});
