import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";

const plugins = [
    typescript({
        tsconfig: "tsconfig.json",
        useTsconfigDeclarationDir: true,
    }),
    terser(),
]

export default [
    { // 웹 컴포넌트 관련
        plugins: plugins,
        input: "src/index.ts",
        output: [
            { file: "dist/index.esm.js", format: "esm", name: "TouchRipple", sourcemap: true },
            { file: "dist/index.umd.js", format: "umd", name: "TouchRipple", sourcemap: true },
        ],
    },
    /*
    { // JSX 관련
        plugins: plugins,
        input: "src/jsx/index.tsx",
        output: [
            { file: "dist/jsx/index.esm.jsx", format: "esm", name: "TouchRippleJSX", sourcemap: true },
            { file: "dist/jsx/index.umd.jsx", format: "umd", name: "TouchRippleJSX", sourcemap: true },
        ],
    }
    */
]