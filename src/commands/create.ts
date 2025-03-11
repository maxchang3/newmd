import { link, log } from '@/log'
import { resolveConfig, writeMarkdownFile } from '@/utils'
import { Frontmatter } from '@/utils/frontmatter'
import { Command, Option } from 'clipanion'
import { slug as slugify } from 'github-slugger'

export class CreateCommand extends Command {
    static usage = Command.Usage({
        description: `Create a markdown file with frontmatter`,
        details: `
            Generates a markdown file with frontmatter using the following workflow:

            1. Loads config from \`newmd.config.[ts|js|mjs]\` in the current working directory

            2. Generate empty frontmatter from the specified schema template in the config

            3. Creates output file using \`<title>\` or \`--slug\` for filename construction.
        `,
        examples: [[
            `Create from \`blog\` schema with title "Hello World"`,
            `$0 blog "Hello World"`,
        ]],
    })

    schemaName = Option.String()

    title = Option.String()

    content = Option.String('--content', { description: 'Set the content of the markdown file' })

    cwd = Option.String('--cwd', { description: 'Set the current working directory' })

    filepath = Option.String('--path', { description: 'Set the output directory' })

    slug = Option.String('--slug', { description: 'Set the slug for the filename, if not provided, it will be generated from the slugified title.' })

    toml = Option.Boolean('--toml', { description: 'Whether to use TOML format for frontmatter' })

    async execute() {
        const config = await resolveConfig({
            toml: this.toml,
            path: this.filepath,
        }, {
            cwd: this.cwd,
        })

        const schema = config.schemas[this.schemaName]

        if (!schema) {
            log.error(`Schema "${link(this.schemaName)}" not found`)
            return 1
        }

        const titleKey = typeof config.titleMapping === 'string' ? config.titleMapping : config.titleMapping[this.schemaName]

        if (!titleKey) {
            log.error(`Title key for schema "${link(this.schemaName)}" not found`)
            return 1
        }

        const type = this.toml ? 'toml' : 'yaml'

        const frontmatter = Frontmatter.fromZodSchema(schema, { titleKey, type })

        const filepath = await writeMarkdownFile({
            filename: slugify(this.slug ?? this.title),
            frontmatter: frontmatter.toString(this.title),
            content: this.content,
            path: config.path,
        })

        log.info(`File created at ${link(filepath)}`)
    }

    async catch(error: unknown) {
        const { code: errorCode } = error as { code?: string }
        switch (errorCode) {
            case 'EEXIST':
                log.error(`File already exists`)
                break
            default:
                throw error
        }
    }
}
