import type { ZodTypeAny } from 'zod'

export interface Config {
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
