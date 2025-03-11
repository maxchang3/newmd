import fs from 'node:fs/promises'
import { resolve } from 'pathe'

export const writeMarkdownFile = async (options: {
    filename: string
    content: string
    path: string
    cwd?: string
}) => {
    const { filename, content, path, cwd } = options

    const outputDir = resolve(cwd ?? '', path)
    const filepath = resolve(outputDir, `${filename}.md`)

    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(filepath, content)

    return filepath
}
