import fs from 'node:fs/promises'
import process from 'node:process'
import { resolveConfig } from '@/config'
import { getFrontmatter } from '@/utils'
import { Command, Option } from 'clipanion'
import { slug as slugify } from 'github-slugger'
import { resolve } from 'pathe'
import { init as getDefault } from 'zod-empty'

export class CreateCommand extends Command {
    static usage = Command.Usage({
        description: `Create a markdown file with frontmatter`,
        details: `
            Generates a markdown file with frontmatter using the following workflow:

            1. Loads config from \`newmd.config.[ts|js|mjs]\` in the current working directory

            2. Generate empty frontmatter from the specified schema template in the config

            3. Creates output file using \`<title>\` or \`--slug\` for filename construction,
              if  \`--slug\` is not provided, \`<title>\` will be automatically slugified as filename.
        `,
        examples: [[
            `Create from \`blog\` schema with title "Hello World"`,
            `$0 blog "Hello World"`,
        ]],
    })

    schemaName = Option.String()

    title = Option.String()

    cwd = Option.String('--cwd', process.cwd(), { description: 'Specify the current working directory' })

    filepath = Option.String('--path', { description: 'Specify the output directory' })

    toml = Option.Boolean('--toml', { description: 'Whether to use toml format for frontmatter' })

    slug = Option.String('--slug', { description: 'Specify the slug for the filename' })

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

        const defaultData = getDefault(schema) as Record<string, unknown>
        const frontmatter = getFrontmatter(defaultData, config.toml)
        const filename = slugify(this.slug ?? this.title)
        const outputDir = resolve(this.cwd, config.path)

        const filepath = resolve(outputDir, `${filename}.md`)

        await fs.mkdir(outputDir, { recursive: true })
        await fs.writeFile(filepath, frontmatter)

        this.context.stdout.write(`File created at ${filepath}\n`)
    }
}
