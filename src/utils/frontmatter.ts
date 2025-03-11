import type { StringKeys, ZodStringKeys } from '@/types'
import type { AnyZodObject } from 'zod'
import yaml from 'js-yaml'
import toml from 'smol-toml'
import { init as createSchemaDefaults } from 'zod-empty'

export type FrontmatterType = 'yaml' | 'toml'

interface FrontmatterConfig<Metadata extends Record<string, any>> {
    /**
     * Base metadata for the markdown file, will be used to generate the frontmatter.
     */
    baseMetadata: Metadata
    /**
     * Key in the metadata object that will be used as the title, the value must be a string.
     */
    titleKey: StringKeys<Metadata>
    /**
     * Type of frontmatter to generate.
     *
     * @defaultValue "yaml"
     */
    type?: FrontmatterType
}

export class Frontmatter<Metadata extends Record<string, any>> {
    config: FrontmatterConfig<Metadata>

    constructor({ baseMetadata, titleKey, type = 'yaml' }: typeof this.config) {
        this.config = { baseMetadata, type, titleKey }
    }

    static fromZodSchema<Schema extends AnyZodObject>(schema: Schema, options: {
        titleKey: ZodStringKeys<Schema>
        type?: FrontmatterType
    }) {
        const { titleKey, type = 'yaml' } = options
        const defaultData = createSchemaDefaults(schema)
        return new Frontmatter({ baseMetadata: defaultData, type, titleKey })
    }

    toString(title: string) {
        const { titleKey, baseMetadata } = this.config
        const metadata = structuredClone(baseMetadata)
        const filteredMetadata = Object.fromEntries(
            Object.entries(metadata).filter(([_, value]) => value !== null),
        )
        if (titleKey in filteredMetadata) {
            // @ts-expect-error titleKey is a valid key in metadata
            filteredMetadata[titleKey] = title
        } else {
            throw new Error(`Title key "${String(titleKey)}" not found in metadata`)
        }
        const isTOML = this.config.type === 'toml'
        const fence = isTOML ? '+++' : '---'
        const frontmatter = isTOML
            ? toml.stringify(filteredMetadata)
            : yaml.dump(filteredMetadata).trim()
        return `${fence}\n${frontmatter}\n${fence}\n`
    }
}
