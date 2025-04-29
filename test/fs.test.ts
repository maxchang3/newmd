import type { MarkdownOptions } from '@/utils'
import { writeMarkdownFile } from '@/utils'
import { vol } from 'memfs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:fs')
vi.mock('node:fs/promises')

beforeEach(() => {
    vol.reset()
})

describe('file system', () => {
    const options: MarkdownOptions = {
        filename: 'hello-world',
        frontmatter: '---\ntitle: Hello World\n---',
        content: 'Hello World',
        path: '/',
        cwd: '/',
    }

    const filecontent = `${options.frontmatter}\n${options.content}`

    it('should write markdown file', async () => {
        const filepath = await writeMarkdownFile(options)
        expect(filepath).toBe(`/${options.filename}.md`)
        expect(vol.readFileSync(filepath, 'utf-8')).toBe(filecontent)
    })

    it('should not overwrite existing file', async () => {
        vol.fromJSON({ '/hello-world.md': filecontent })
        await expect(writeMarkdownFile(options)).rejects.toThrow(
            expect.objectContaining({
                message: expect.stringContaining('EEXIST'),
            })
        )
    })

    it('should overwrite existing file when overwrite option is true', async () => {
        vol.fromJSON({
            '/hello-world.md': '---\ntitle: Old Title\n---\nOld Content',
        })
        const filepath = await writeMarkdownFile({
            ...options,
            overwrite: true,
        })
        expect(filepath).toBe(`/${options.filename}.md`)
        expect(vol.readFileSync(filepath, 'utf-8')).toBe(filecontent)
    })
})
