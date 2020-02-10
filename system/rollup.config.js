import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import linaria from "linaria/rollup";
import pkg from "./package.json";

export default {
  input: ["./src/index.ts", "./src/tokens/index.ts"],
  output: { dir: "build" },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({ exclude: "**/*.test.ts" }),
    sourceMaps(),
    terser({
      sourcemap: true,
      output: { comments: false },
      warnings: true,
      ecma: 5,
      // Compress and/or mangle variables in top level scope.
      // @see https://github.com/terser-js/terser
      toplevel: true
    }),
    linaria({
      sourceMap: true
    }),
    css({
      output: "build/bundle.css"
    })
  ]
};
