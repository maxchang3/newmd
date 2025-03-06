import fs from 'node:fs/promises'
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
            This command will create a markdown file with frontmatter based on the provided options
            and \`newmd.config.[ts,js,mjs]\` file in the current working directory.
        `,
        examples: [[
            `Create a markdown file with a title`,
            `$0 blog "Hello World"`,
        ]],
    })

    schemaName = Option.String({ required: true })

    title = Option.String({ required: true })

    cwd = Option.String('--cwd', { hidden: true })

    toml = Option.Boolean('--toml', { description: 'Output frontmatter in TOML format' })

    async execute() {
        const config = await resolveConfig({
            cwd: this.cwd,
            toml: this.toml,
        })

        const schema = config.schemas[this.schemaName]

        if (!schema) {
            this.context.stderr.write(`Schema "${this.schemaName}" not found\n`)
            return 1
        }

        const defaultData = getDefault(schema)
        const frontmatter = getFrontmatter(defaultData, config.toml)
        const filename = slugify(this.title)
        const outputDir = resolve(config.cwd, config.path)
        const filepath = resolve(outputDir, `${filename}.md`)

        await fs.mkdir(outputDir, { recursive: true })
        await fs.writeFile(filepath, frontmatter)

        this.context.stdout.write(`File created at ${filepath}\n`)
    }
}
