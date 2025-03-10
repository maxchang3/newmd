import type { AnyZodObject, z } from 'zod'

export type TitleMapping = string | Record<string, string>

type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T]

export interface Config<Schemas extends Record<string, AnyZodObject> = Record<string, AnyZodObject>> {
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
    schemas?: Schemas
    /**
     * Mapping for the `title` input to a specific schema field.
     *
     * - If a string is provided, it is used as the default key for all schemas.
     *   - the key must exist in all schemas, and the value must be a string
     * - If an object is provided, it maps specific schemas to different keys.
     *   - the key must exist in the specified schema, and the value must be a string
     *
     * Example usage:
     * ```ts
     * titleMapping: "title"; // Applies "title" to all schemas
     * titleMapping: { blog: "title", article: "headline" }; // Different mappings per schema
     * ```
     *
     * @defaultValue "title"
     */
    titleMapping?: StringKeys<z.infer<Schemas[keyof Schemas]>> | { [K in keyof Schemas]?: StringKeys<z.infer<Schemas[K]>> }
}
