import type { AnyZodObject } from 'zod'
import yaml from 'js-yaml'
import TOML from 'smol-toml'
import { init as createSchemaDefaults } from 'zod-empty'

export const generateFrontmatter = (data: Record<string, any>, toml: boolean) => {
    const fence = toml ? '+++' : '---'
    const frontmatter = toml ? TOML.stringify(data) : yaml.dump(data).trim()
    return `${fence}\n${frontmatter}\n${fence}\n`
}

export const generateFrontmatterFromSchema = (schema: AnyZodObject, options: {
    title: string
    titleKey?: string
    toml?: boolean
}) => {
    const { title, titleKey = 'title', toml = false } = options
    const defaultData = createSchemaDefaults(schema)
    if (titleKey in defaultData) {
        defaultData[titleKey] = title
    }
    return generateFrontmatter(defaultData, toml)
}
