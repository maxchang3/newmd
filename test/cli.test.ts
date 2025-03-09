import { resolve } from 'pathe'
import { exec } from 'tinyexec'
import { describe, expect, it } from 'vitest'

describe('cli', () => {
    it('newmd cli should just works', async () => {
        const binPath = resolve(__dirname, '../bin/newmd.mjs')

        const proc = await exec(process.execPath, [binPath, '--help'])

        expect(proc.stderr).toBe('')
    })
})
