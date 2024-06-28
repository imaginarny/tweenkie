import { readdirSync } from 'node:fs'
import path from 'node:path'
import terser from '@rollup/plugin-terser'

const files = readdirSync('./src', { recursive: true }).filter(f => ['.js', '.mjs'].includes(path.extname(f)))
const excludeUmdFor = /server\/?/

const extConfig = {
  '.mjs': {
    format: 'esm',
    compact: true,
    sourcemap: true,
  },

  '.cjs': {
    format: 'cjs',
    sourcemap: true,
    compact: true,
    strict: false,
  },

  '.js': {
    format: 'umd',
    name: 'tween',
    file: 'dist/umd'
  }
}

const minConfig = {
  plugins: [terser()]
}

const getFileConfig = (file) => {
  const { dir, name } = path.parse(file)
  const distPath = `dist/${dir}/${name}`

  return {
    input: `src/${file}`,
    output: Object.keys(extConfig)
      .filter(ext => extConfig[ext].format != 'umd' || (extConfig[ext].format == 'umd' && !excludeUmdFor.test(file)))
      .map(ext => [
        {
          ...extConfig[ext],
          file: extConfig[ext].format == 'umd'
          ? `${extConfig[ext].file}/${dir}/${name}${ext}`
          : distPath + ext,
        },
        {
          ...extConfig[ext],
          file: extConfig[ext].format == 'umd'
            ? `${extConfig[ext].file}/${dir}/${name}.min${ext}`
            : `${distPath}.min${ext}`,
          ...minConfig,
        }
      ]).flat()
  }
}

const getRollupConfig = () => {
  return files.map(file => getFileConfig(file))
}

export default getRollupConfig()
