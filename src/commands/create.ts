import { resolveConfig } from '@/config'
import { generateFrontmatterFromSchema, writeMarkdownFile } from '@/utils'
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

    cwd = Option.String('--cwd', { description: 'Specify the current working directory' })

    filepath = Option.String('--path', { description: 'Specify the output directory' })

    slug = Option.String('--slug', { description: 'Specify the slug for the filename, if not provided, it will be generated from the slugified title.' })

    toml = Option.Boolean('--toml', { description: 'Whether to use toml format for frontmatter' })

    async execute() {
        const config = await resolveConfig({
            toml: this.toml,
            path: this.filepath,
        }, {
            cwd: this.cwd,
        })

        const schema = config.schemas[this.schemaName]

        if (!schema) {
            this.context.stderr.write(`Schema "${this.schemaName}" not found\n`)
            return 1
        }

        const frontmatter = generateFrontmatterFromSchema(schema, {
            title: this.title,
            titleKey: typeof config.titleMapping === 'string' ? config.titleMapping : config.titleMapping[this.schemaName],
            toml: config.toml,
        })

        const filepath = await writeMarkdownFile({
            filename: slugify(this.slug ?? this.title),
            content: frontmatter,
            path: config.path,
        })

        this.context.stdout.write(`File created at ${filepath}\n`)
    }
}
