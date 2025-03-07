import yaml from 'js-yaml'
import TOML from 'smol-toml'

export const createFrontmatter = (object: Record<string, unknown>, toml: boolean) => {
    const fence = toml ? '+++' : '---'
    const frontmatter = toml ? TOML.stringify(object) : yaml.dump(object).trim()
    return `${fence}\n${frontmatter}\n${fence}\n`
}
