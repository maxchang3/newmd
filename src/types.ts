import type { ZodTypeAny } from 'zod'

export interface Options {
    cwd?: string
    /**
     * Root path for the markdown file.
     */
    path?: string
    /**
     * If true, the output frontmatter will be in TOML format.
     */
    toml?: boolean
    /**
     * Array of Zod schemas to be used for data generation.
     */
    schemas?: Record<string, ZodTypeAny>
}

type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>

export type DefaultOptions = RequiredExcept<Options, 'path' | 'cwd'>
