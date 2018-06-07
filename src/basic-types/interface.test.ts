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
});
