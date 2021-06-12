import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const name = require('./package.json').main.replace(/\.js$/, '');

const bundle = config => ({
  ...config,
  input: 'src/index.ts'
})

export default [
  bundle({
    plugins: [esbuild()],
    output: {
      file: `${name}.mjs`,
      format: 'es',
      sourcemap: true
    }
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es'
    }
  })
]


