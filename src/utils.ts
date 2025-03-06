import yaml from 'js-yaml'
import TOML from 'smol-toml'

export const getFrontmatter = (object: Record<string, unknown>, toml: boolean) => {
    if (toml) return `+++\n${TOML.stringify(object)}\n+++`
    return `---\n${yaml.dump(object)}---`
}
