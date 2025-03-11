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
    it('should write markdown file', async () => {
        const filename = 'hello-world'
        const content = 'Hello World'
        const filepath = await writeMarkdownFile({
            filename,
            content,
            path: '/',
            cwd: '/',
        })
        expect(filepath).toBe(`/${filename}.md`)
        expect(vol.readdirSync('/')).toContain(`${filename}.md`)
        expect(vol.readFileSync(filepath, 'utf-8')).toBe(content)
    })
})
