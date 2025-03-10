import type { Config } from '@/types'
import { DEFAULT_CONFIG } from '@/consts'
import { deepmerge } from 'deepmerge-ts'
import { createConfigLoader } from 'unconfig'

export const resolveConfig = async (config?: Config, options?: {
    cwd?: string
}) => {
    const loader = createConfigLoader<Config>({
        sources: [
            {
                files: 'newmd.config',
                extensions: ['ts', 'mjs', 'js'],
            },
        ],
        cwd: options?.cwd,
    })

    const loadResult = await loader.load()

    // Respect config file when no explicit options are provided
    if (!loadResult.sources.length) return deepmerge(DEFAULT_CONFIG, config) as Required<Config>

    return deepmerge(deepmerge(DEFAULT_CONFIG, loadResult.config), config) as Required<Config>
}
