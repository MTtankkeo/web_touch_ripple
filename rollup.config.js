import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const plugins = [
    typescript({
        tsconfig: "tsconfig.json",
        useTsconfigDeclarationDir: true,
    }),
    terser(),
]

export default {
    plugins: plugins,
    input: "src/index.ts",
    output: [
        { file: "dist/index.js", format: "umd", name: "index", sourcemap: true }
    ],
}