import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';
import pkg from './package.json';

const globals = {
  '@vueuse/core': 'VueUse',
};

const configs = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'v-use-edit-image',
        globals,
      },
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        name: 'v-use-edit-image',
        globals,
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm.js',
        format: 'es',
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
      eslint({}),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
];

configs.push({
  input: 'src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
});

export default configs;
