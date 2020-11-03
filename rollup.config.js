import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const configs = [
  {
    input: "src/composables/useCanvas/index.ts",
    output: [
      {
        file: pkg.main,
        format: "umd",
        name: "v-use-edit-image",
        globals: {
          "vue-demi": "VueDemi",
        },
      },
      {
        file: `dist/index.umd.min.js`,
        format: "umd",
        name: "v-use-edit-image",
        globals: {
          "vue-demi": "VueDemi",
        },
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
      },
      {
        file: "dist/index.esm.js",
        format: "es",
      },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
];

configs.push({
  input: `src/composables/useCanvas/index.ts`,
  output: {
    file: `dist/index.d.ts`,
    format: "es",
  },
  plugins: [dts()],
});

export default configs;
