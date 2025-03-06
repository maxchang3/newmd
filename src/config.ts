import type { NewMDConfig, Options } from '@/types'
import process from 'node:process'
import { DEFAULT_OPTIONS } from '@/consts'
import deepmerge from 'deepmerge'
import { createConfigLoader } from 'unconfig'

export const resolveConfig = async <T extends Options>(options: T) => {
    const loader = createConfigLoader<NewMDConfig>({
        sources: [
            {
                files: 'newmd.config',
                extensions: ['ts', 'mjs', 'js'],
            },
        ],
        cwd: options.cwd || process.cwd(),
    })

    const loadResult = await loader.load()

    if (!loadResult.sources.length) return DEFAULT_OPTIONS

    return deepmerge(DEFAULT_OPTIONS, loadResult.config)
}
