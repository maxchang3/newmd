import fs from 'node:fs/promises'
import { resolve } from 'pathe'

export const writeMarkdownFile = async (options: {
    filename: string
    frontmatter: string
    content?: string
    path?: string
    cwd?: string
}) => {
    const { filename, frontmatter, content, path, cwd } = options

    const outputDir = resolve(cwd ?? '', path ?? '.')
    const filepath = resolve(outputDir, `${filename}.md`)

    let fileContent = frontmatter
    if (content) fileContent += `\n${content}`

    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(filepath, fileContent)

    return filepath
}
