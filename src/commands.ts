import { resolveConfig } from '@/config'
import { getFrontmatter } from '@/utils'
import { Command, Option } from 'clipanion'
import { init as getDefaultObj } from 'zod-empty'

class CreateCommand extends Command {
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

    toml = Option.Boolean('--toml', false, { description: 'Output frontmatter in TOML format' })

    async execute() {
        const config = await resolveConfig({ cwd: this.cwd })
        const schema = config.schemas[this.schemaName]
        if (!schema) {
            this.context.stderr.write(`Schema "${this.schemaName}" not found\n`)
            return 1
        }
        const defaultObj = getDefaultObj(schema)
        const frontmatter = getFrontmatter(defaultObj, this.toml)
        this.context.stdout.write(`${frontmatter}\n`)
    }
}

export const commands = [
    CreateCommand,
]
