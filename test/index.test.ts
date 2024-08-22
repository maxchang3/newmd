import { describe, expect, it } from 'vitest'
import { readConfig } from '@/config'

describe('readConfig', () => {
    it('should read the correct configuration file', async () => {
        const config = await readConfig('./fixtures/createmd.config.ts', import.meta.url)
        expect(config.schema).toBeDefined()
    })
})
