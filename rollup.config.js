import alias from '@rollup/plugin-alias';
import minify from 'rollup-plugin-minify';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';
import typescript from 'rollup-plugin-typescript';
// import typescript from '@rollup/plugin-typescript';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

const addOutputType = (options) => ({
  name: '@anivive/vue3-form-wizard',
  compact: true,
  interop: 'auto',
  exports: 'auto',
  sourcemap: true,
  globals: {
    vue: 'vue'
  },
  ...options
});

export default {
  input: 'src/main.js',
  output: [
    addOutputType({ file: 'dist/index.common.js', format: 'cjs' }),
    addOutputType({ file: 'dist/index.umd.js', format: 'umd' }),
    addOutputType({ file: 'dist/index.esm.js', format: 'esm' }),
    addOutputType({ file: 'dist/index.common.min.js', format: 'cjs', plugins: [terser()] }),
    addOutputType({ file: 'dist/index.umd.min.js', format: 'umd', plugins: [terser()] }),
    addOutputType({ file: 'dist/index.esm.min.js', format: 'esm', plugins: [terser()] })
  ],
  plugins: [
    peerDepsExternal(),
    alias({
      entries: {
        '@': `${__dirname}/src`,
      }
    }),
    scss({
      output: 'dist/index.css',
      outputStyle: 'compressed'
    }),
    typescript(),
    vue({
      css: false
    }),
    minify({
      cjs: 'index.common.min.js',
      umd: 'index.umd.min.js',
      esm: 'index.esm.min.js',
    })
  ]
};
