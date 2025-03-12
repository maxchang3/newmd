import fs from 'node:fs/promises'
import { resolve } from 'pathe'

export interface MarkdownOptions {
    filename: string
    frontmatter: string
    content?: string
    path?: string
    cwd?: string
    overwrite?: boolean
}

export const writeMarkdownFile = async (options: MarkdownOptions) => {
    const { filename, frontmatter, content, path, cwd, overwrite = false } = options

    const outputDir = resolve(cwd ?? '', path ?? '.')
    const filepath = resolve(outputDir, `${filename}.md`)

    let fileContent = frontmatter
    if (content) fileContent += `\n${content}`

    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(filepath, fileContent, { flag: overwrite ? 'w' : 'wx' })

    return filepath
}
