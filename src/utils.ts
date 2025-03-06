import yaml from 'js-yaml'
import TOML from 'smol-toml'

export const getFrontmatter = (object: Record<string, unknown>, toml: boolean) => {
    const fence = toml ? '+++' : '---'
    const frontmatter = toml ? TOML.stringify(object) : yaml.dump(object)
    return `${fence}\n${frontmatter}${fence}\n`
}
