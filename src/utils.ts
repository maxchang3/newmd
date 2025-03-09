import type { AnyZodObject } from 'zod'
import yaml from 'js-yaml'
import TOML from 'smol-toml'
import { init as createSchemaDefaults } from 'zod-empty'

export const createFrontmatter = (schema: AnyZodObject, options: {
    title: string
    titleKey: string
    toml: boolean
}) => {
    const defaultData = createSchemaDefaults(schema)
    if (options.titleKey in defaultData) {
        defaultData[options.titleKey] = options.title
    }
    const fence = options.toml ? '+++' : '---'
    const frontmatter = options.toml ? TOML.stringify(defaultData) : yaml.dump(defaultData).trim()
    return `${fence}\n${frontmatter}\n${fence}\n`
}
