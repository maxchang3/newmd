import { resolveConfig } from '@/utils'
import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'

const fixtureDir = resolve(__dirname, 'fixtures')

describe('config', () => {
    it('should return default config', async () => {
        const config = await resolveConfig({}, { cwd: fixtureDir })
        expect(config).matchSnapshot()
    })

    it('should return merged config', async () => {
        const cwd = resolve(fixtureDir, 'headline')
        const config = await resolveConfig({}, { cwd })
        expect(config).matchSnapshot()
    })

    it('should support schema-specific paths', async () => {
        const cwd = resolve(fixtureDir, 'schema-paths')
        const config = await resolveConfig({}, { cwd })

        // Test that path config is resolved as object form with all schemas
        expect(config.path).toMatchSnapshot('schema-specific-paths')
        expect(config.format).toBe('yaml')
        expect(config.titleMapping).toBe('title')
    })
})
