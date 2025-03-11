import { writeMarkdownFile } from '@/utils'
import { vol } from 'memfs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:fs')
vi.mock('node:fs/promises')

beforeEach(() => {
    // reset the state of in-memory fs
    vol.reset()
})

describe('file system', () => {
    const path = '/'
    const cwd = '/'
    it('should write markdown file', async () => {
        const filename = 'hello-world'
        const frontmatter = '---\ntitle: Hello World\n---'
        const content = 'Hello World'
        const filepath = await writeMarkdownFile({
            filename,
            frontmatter,
            content,
            path,
            cwd,
        })
        expect(filepath).toBe(`/${filename}.md`)
        expect(vol.readdirSync('/')).toContain(`${filename}.md`)
        expect(vol.readFileSync(filepath, 'utf-8')).toBe(`${frontmatter}\n${content}`)
    })

    it('should not overwrite existing file', async () => {
        vol.fromJSON({ '/hello-world.md': '---\ntitle: Hello World\n---\nHello World' })
        await expect(writeMarkdownFile({
            filename: 'hello-world',
            frontmatter: '---\ntitle: Hello World\n---',
            content: 'This should not overwrite',
            path,
            cwd,
        })).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: EEXIST: file already exists, open '/hello-world.md']`)
    })
})
