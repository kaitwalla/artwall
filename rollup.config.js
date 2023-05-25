import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

export default {
  input: "ts/main.ts",
  output: {
    dir: "public",
    format: "iife",
  },
  plugins: [
    typescript({ compilerOptions: { lib: ["es5", "es6", "dom"] } }),
    scss({ output: "public/main.css" }),
    nodeResolve(),
    commonjs(),
  ],
};
