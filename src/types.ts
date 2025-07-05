import type { FrontmatterType } from '@/utils'
import type { AnyZodObject, z } from 'zod'

// Simple expand types, not perfect but works for this use case
type Expand<T> = T extends infer O ? O : never

export type StringKeys<T> = Expand<{ [K in keyof T]: T[K] extends string ? K : never }[keyof T]>

export type ZodStringKeys<Schema extends AnyZodObject> = StringKeys<z.infer<Schema>>

type ZodStringKeysFromSchemas<
    Schemas extends Record<string, AnyZodObject>,
    K extends keyof Schemas = keyof Schemas,
> = ZodStringKeys<Schemas[K]>

export interface Config<
    Schemas extends Record<string, AnyZodObject> = Record<string, AnyZodObject>,
> {
    /**
     * Root path for the markdown file.
     *
     * - If a string is provided, it is used as the default path for all schemas.
     * - If an object is provided, it must specify paths for ALL schemas defined in the config.
     *
     * Example usage:
     * ```ts
     * path: "./content"; // Applies "./content" to all schemas
     * path: { blog: "./content/blog", docs: "./docs" }; // Must include ALL schemas
     * ```
     *
     * @defaultValue "."
     */
    path?: string | { [K in keyof Schemas]: string }
    /**
     * Format for the frontmatter
     *
     * @defaultValue "yaml"
     */
    format?: FrontmatterType
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
    titleMapping?:
        | ZodStringKeysFromSchemas<Schemas>
        | { [K in keyof Schemas]?: ZodStringKeysFromSchemas<Schemas, K> }
}
