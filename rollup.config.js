import babel from 'rollup-plugin-babel'
import scss from 'rollup-plugin-scss'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry    : 'src/main.js',
  format   : 'cjs',
  dest     : 'dist/bundle.js',
  sourceMap: 'inline',
  plugins  : [
    scss({ output: 'dist/bundle.css' }),
    resolve({
      jsnext : true,
      main   : true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),]
}