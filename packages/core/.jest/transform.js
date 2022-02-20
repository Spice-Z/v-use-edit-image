module.exports = require('babel-jest').default.createTransformer({
 presets: [
   ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
   '@babel/preset-typescript',
 ],
 plugins: ['@babel/plugin-transform-modules-commonjs'],
});