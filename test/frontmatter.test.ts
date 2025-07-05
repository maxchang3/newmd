import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { Frontmatter } from '@/utils'

describe('frontmatter', () => {
    it('should generate frontmatter in yaml format', () => {
        const frontmatter = new Frontmatter({
            baseMetadata: { title: '' },
            titleKey: 'title',
        })
        const result = frontmatter.toString('Hello World')
        expect(result).toBe('---\ntitle: Hello World\n---\n')
    })

    it('should generate frontmatter with custom title key', () => {
        const frontmatter = new Frontmatter({
            baseMetadata: { headline: '' },
            titleKey: 'headline',
        })
        const result = frontmatter.toString('Hello World')
        expect(result).toBe('---\nheadline: Hello World\n---\n')
    })

    it('should generate frontmatter in toml format', () => {
        const frontmatter = new Frontmatter({
            baseMetadata: { title: '' },
            titleKey: 'title',
            type: 'toml',
        })
        const result = frontmatter.toString('Hello World')
        expect(result).toBe('+++\ntitle = "Hello World"\n+++\n')
    })

    it('should throw error if title key is not found in metadata', () => {
        const frontmatter = new Frontmatter({
            baseMetadata: {},
            // @ts-expect-error title is not a valid key in metadata
            titleKey: 'title',
        })
        expect(() => frontmatter.toString('Hello World')).toThrowErrorMatchingSnapshot()
    })

    it('should generate frontmatter from zod schema', () => {
        const schema = z.object({
            title: z.string(),
            description: z.string().optional(),
        })
        const frontmatter = Frontmatter.fromZodSchema(schema, {
            titleKey: 'title',
        })
        const result = frontmatter.toString('Hello World')
        expect(result).toBe("---\ntitle: Hello World\ndescription: ''\n---\n")
    })
})
