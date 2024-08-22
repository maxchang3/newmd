import { tsImport } from 'tsx/esm/api'
import type { BaseSchema, CreateMDConfig } from './types'

export { z } from 'zod'

export const defineConfig = <S extends BaseSchema>(config: CreateMDConfig<S>) => config

export const readConfig = async <S extends BaseSchema>(filepath: string = 'createmd.config.ts', baseURL: string = import.meta.url) => {
    const { default: loadedConfig } = await tsImport(filepath, baseURL)
    return loadedConfig as CreateMDConfig<S>
}
