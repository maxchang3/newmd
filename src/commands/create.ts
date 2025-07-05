import { Command, Option } from 'clipanion'
import { slug as slugify } from 'github-slugger'
import { link, log } from '@/log'
import { resolveConfig, writeMarkdownFile } from '@/utils'
import { Frontmatter } from '@/utils/frontmatter'

export class CreateCommand extends Command {
    static usage = Command.Usage({
        description: `Create a markdown file with frontmatter`,
        details: `
            Generates a markdown file with frontmatter using the following workflow:

            1. Loads config from \`newmd.config.[ts|js|mjs]\` in the current working directory

            2. Generate empty frontmatter from the specified schema template in the config

            3. Creates output file using \`<title>\` or \`--slug\` for filename construction.
        `,
        examples: [
            [`Create from \`blog\` schema with title "Hello World"`, `$0 blog "Hello World"`],
        ],
    })

    schemaName = Option.String()

    title = Option.String()

    content = Option.String('--content', {
        description: 'Set the content of the markdown file',
    })

    filepath = Option.String('--path', {
        description: 'Set the output directory',
    })

    slug = Option.String('--slug', {
        description:
            'Set the slug for the filename, if not provided, it will be generated from the slugified title.',
    })

    toml = Option.Boolean('--toml', {
        description: 'Whether to use TOML format for frontmatter',
    })

    overwrite = Option.Boolean('--overwrite', {
        description: 'Overwrite existing file',
    })

    cwd = Option.String('--cwd', {
        description: 'Set the current working directory',
    })

    async execute() {
        const config = await resolveConfig(
            {
                format: this.toml ? 'toml' : 'yaml',
                path: this.filepath,
            },
            {
                cwd: this.cwd,
            }
        )

        const schema = config.schemas[this.schemaName]

        if (!schema) {
            log.error(`Schema "${link(this.schemaName)}" not found`)
            return 1
        }

        const titleKey =
            typeof config.titleMapping === 'string'
                ? config.titleMapping
                : config.titleMapping[this.schemaName]

        if (!titleKey) {
            log.error(`Title key for schema "${link(this.schemaName)}" not found`)
            return 1
        }

        // Resolve the path for this specific schema
        const schemaPath =
            typeof config.path === 'string' ? config.path : config.path?.[this.schemaName]

        if (typeof config.path === 'object' && !schemaPath) {
            log.error(
                `Path for schema "${link(this.schemaName)}" not found. When using schema-specified path configuration, all schemas must have a defined path.`
            )
            return 1
        }

        const finalPath = schemaPath ?? '.'

        const type = this.toml ? 'toml' : 'yaml'

        const frontmatter = Frontmatter.fromZodSchema(schema, {
            titleKey,
            type,
        })

        const filepath = await writeMarkdownFile({
            filename: slugify(this.slug ?? this.title),
            frontmatter: frontmatter.toString(this.title),
            content: this.content,
            path: finalPath,
            overwrite: this.overwrite,
        })

        log.info(`File created at ${link(filepath)}`)
    }

    async catch(error: unknown) {
        const { code: errorCode } = error as { code?: string }
        switch (errorCode) {
            case 'EEXIST':
                log.error(`File already exists, use ${link('--overwrite')} to overwrite`)
                break
            default:
                throw error
        }
    }
}
