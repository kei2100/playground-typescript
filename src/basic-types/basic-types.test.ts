test('define array', () => {
  const l1: number[] = [1, 2, 3];
  const l2: Array<number> = [1, 2, 3]; // 同義

  expect(l1).toEqual(l2);
});