import { getFrontmatter } from '@/utils'
import { describe, expect, it } from 'vitest'

describe('utils', () => {
    it('should return frontmatter in yaml format', () => {
        const frontmatter = getFrontmatter({ title: 'Hello World' }, false)
        expect(frontmatter).toBe('---\ntitle: Hello World\n---\n')
    })
    it('should return frontmatter in toml format', () => {
        const frontmatter = getFrontmatter({ title: 'Hello World' }, true)
        expect(frontmatter).toBe('+++\ntitle = "Hello World"\n+++\n')
    })
})
