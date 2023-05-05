// 以下のような定義では、getLangs から返却される型は readonly string[] になるが、
//
// const getLangs = <T extends { langs: readonly string[] }>(
//     args: T,
// ): T['langs'] => {
//     return args.langs;
// };

// 以下のような定義ににすることで <const T ...>、
const getLangs = <const T extends { langs: readonly string[] }>(
    args: T,
): T['langs'] => {
    return args.langs;
};

// 戻り値の型が例えば以下のような例では、 langs の型は readonly ["ja", "en", ""fr] と、より具体的な型にすることができる
const langs = getLangs({ langs: ['ja', 'en', 'fr'] });

// $ npx ts-node src/v5/const-type-parameters.ts
// [ 'ja', 'en', 'fr' ]
console.log(langs)
