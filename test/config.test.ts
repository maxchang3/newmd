import { resolveConfig } from '@/config'
import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'

const fixtureDir = resolve(__dirname, 'fixtures')

describe('config', () => {
    it('should return default config', async () => {
        const config = await resolveConfig()
        expect(config).matchSnapshot()
    })

    it('should return merged config', async () => {
        const cwd = resolve(fixtureDir, 'headline')
        const config = await resolveConfig({}, { cwd })
        expect(config).matchSnapshot()
    })
})
