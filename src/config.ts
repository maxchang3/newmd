import type { Options } from '@/types'
import process from 'node:process'
import { DEFAULT_OPTIONS } from '@/consts'
import deepmerge from 'deepmerge'
import { createConfigLoader } from 'unconfig'

export const resolveConfig = async (options: Options) => {
    const loader = createConfigLoader<Options>({
        sources: [
            {
                files: 'newmd.config',
                extensions: ['ts', 'mjs', 'js'],
            },
        ],
        cwd: options.cwd ?? process.cwd(),
    })

    const loadResult = await loader.load()

    // Respect config file when no explicit options are provided
    if (!loadResult.sources.length) return deepmerge(DEFAULT_OPTIONS, options)

    return deepmerge(deepmerge(DEFAULT_OPTIONS, loadResult.config), options)
}
