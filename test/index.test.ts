import { describe, expect, it } from 'vitest'
import { getDefaultsForSchema } from '@/utils/zod'
import { readConfig } from '@/config'

describe('readConfig', () => {
    it('should correctly read the configuration file', async () => {
        const config = await readConfig('./fixtures/createmd.config.mjs', import.meta.url)
        expect(config).toBeDefined()
        expect(config.schema).toBeDefined()
    })
})

describe('getDefaultsForSchema', () => {
    it('should correctly return the default values for the schema', async () => {
        const config = await readConfig('./fixtures/createmd.config.mjs', import.meta.url)
        const schemaDefaults = getDefaultsForSchema(config.schema)
        expect(schemaDefaults).toBeDefined()
        const { success, data } = config.schema.safeParse(schemaDefaults)
        expect(success).toBe(true)
        expect(data).toBeDefined()
    })
})
