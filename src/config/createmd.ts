import type { z } from 'zod'
// import { tsImport } from 'tsx/esm/api'
import type { CreateMDConfig } from './types'

export const defineConfig = <S extends z.AnyZodObject>(config: CreateMDConfig<S>) => config

export const readConfig = async <S extends z.AnyZodObject>(filepath: string = 'createmd.config.ts', baseURL: string = import.meta.url) => {
    const resolvedPath = new URL(filepath, baseURL).href
    const { default: loadedConfig } = await import(resolvedPath)
    return loadedConfig as CreateMDConfig<S>
}
