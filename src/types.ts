import type { ZodTypeAny } from 'zod'

export interface Options {
    cwd?: string
    path?: string
}

export interface NewMDConfig {
    /**
     * Array of Zod schemas to be used for data generation.
     */
    schemas: Record<string, ZodTypeAny>

}
