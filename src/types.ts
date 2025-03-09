import type { AnyZodObject } from 'zod'

export type TitleMapping = string | Record<string, string>

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
    schemas?: Record<string, AnyZodObject>
    /**
     * Mapping for the `title` input to a specific schema field.
     *
     * - If a string is provided, it is used as the default key for all schemas.
     * - If an object is provided, it maps specific schemas to different keys.
     *
     * Example usage:
     * ```ts
     * titleMapping: "title"; // Applies "title" to all schemas
     * titleMapping: { blog: "title", article: "headline" }; // Different mappings per schema
     * ```
     *
     * @defaultValue "title"
     */
    titleMapping?: TitleMapping
}
