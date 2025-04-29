import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['src/index', 'src/cli'],
    declaration: true,
    clean: true,
    alias: {
        '@': fileURLToPath(new URL('src/', import.meta.url)),
    },
})
