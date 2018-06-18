describe('numeric enum', () => {
  it('constant enum', () => {
    const enum Direction {
      UP, // 指定しなければ0始まりでインクリメント
      DOWN,
      LEFT,
      RIGHT
    }

    expect(Direction.UP).toBe(0);
    expect(Direction.RIGHT).toBe(3);

    // reverse mappingはできない
    // const down = Direction.DOWN;
    // expect(Direction[down]).toBe(Direction.DOWN)
  });

  it('computed enum', () => {
    enum FileObject {
      FILE,
      DIRECTORY
    }

    expect(FileObject[FileObject.DIRECTORY]).toBe('DIRECTORY');
    expect(FileObject[1]).toBe('DIRECTORY');
    expect(FileObject['DIRECTORY']).toBe(FileObject.DIRECTORY);
  });
});

describe('string enum', () => {
  enum Color {
    R = 'R',
    G = 'G',
    B = 'B',
  }
  // stringのenumはデバッグしやすい利点がある
  expect(Color['G']).toBe(Color.G);
  expect(Color.B.toString()).toBe('B');
});

describe('enum member types', () => {
  enum Color {
    GREEN,
    RED
  }

  interface Successful {
    color: Color.GREEN
  }

  const s: Successful = {
    // color: Color.RED // error!!
    color: Color.GREEN  // ok
  }
});

describe('union enums', () => {
  enum Color {
    GREEN,
    RED
  }

  function isSuccessful(color: Color): boolean {
    if (color !== Color.RED) {
      return true;
    // } else if (color !== Color.GREEN) { // error !!
    } else {
      return false;
    }
  }
});
