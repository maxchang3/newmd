import { generateFrontmatter, generateFrontmatterFromSchema } from '@/utils'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'

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
})
