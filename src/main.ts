import './style.css'
import './worker'

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// @ts-expect-error
import { Bundler } from './wasm'

import { buildFileTree } from './files'

const tree = buildFileTree({ directories: [], modules: [] })

const editor = monaco.editor.create(document.querySelector('#editor')!, {
  value: '',
  language: 'typescript',
})

const bundler = new Bundler(
  {
    input: [
      {
        import: 'index.js',
      },
    ],
    plugins: [],
    cwd: '/',
    resolve: {
      conditionNames: ['import'],
    },
  },
  {
    plugins: [],
  }
)

const generated = await bundler.generate()

console.log(generated)
