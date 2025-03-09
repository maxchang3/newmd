import { generateFrontmatter, generateFrontmatterFromSchema, writeMarkdownFile } from '@/utils'
import { vol } from 'memfs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

vi.mock('node:fs')
vi.mock('node:fs/promises')

beforeEach(() => {
    // reset the state of in-memory fs
    vol.reset()
})

describe('utils', () => {
    it('should return frontmatter in yaml format', () => {
        const frontmatter = generateFrontmatter({ title: 'Hello World' }, false)
        expect(frontmatter).toBe('---\ntitle: Hello World\n---\n')
    })

    it('should return frontmatter in toml format', () => {
        const frontmatter = generateFrontmatter({ title: 'Hello World' }, true)
        expect(frontmatter).toBe('+++\ntitle = "Hello World"\n+++\n')
    })

    it('should return frontmatter with title', () => {
        const schema = z.object({
            title: z.string(),
        })
        const frontmatter = generateFrontmatterFromSchema(schema, {
            title: 'Hello World',
        })
        expect(frontmatter).toBe('---\ntitle: Hello World\n---\n')
    })

    it('should return frontmatter with custom title key', () => {
        const schema = z.object({
            headline: z.string(),
        })
        const frontmatter = generateFrontmatterFromSchema(schema, {
            title: 'Hello World',
            titleKey: 'headline',
        })
        expect(frontmatter).toBe('---\nheadline: Hello World\n---\n')
    })

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
