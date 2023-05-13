// @ts-check

/**
 * @typedef CompilerOptions
 * @prop {boolean} [strict]
 * @prop {string} [outDir]
 */
interface CompilerOptions {
    strict?: boolean;
    outDir?: string;
}

/**
 * @satisfies {CompilerOptions}
 */
let myCompilerOptions = {
    // outdir: "../lib",
//  ~~~~~~ oops! we meant outDir
} satisfies CompilerOptions;
