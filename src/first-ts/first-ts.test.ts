class Student {
  fullName: string;

  constructor(public firstName: string, public lastName: string) {
    this.fullName = `${firstName} ${lastName}`;
  }
}

interface fullName {
  fullName: string
}

function retFullName(fn: fullName) {
  return fn.fullName;
}

test('test fullName', () => {
  const s = new Student('foo', 'bar');
  expect(retFullName(s)).toBe('foo bar');
});
