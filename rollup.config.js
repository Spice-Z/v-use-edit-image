import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

const configs = [
  {
    input: "src/composables/useCanvas/index.ts",
    output: [
      {
        file: `dist/index.umd.js`,
        format: "umd",
        name: "v-use-edit-image/useCanvas",
        globals: {
          "vue-demi": "VueDemi",
        },
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
