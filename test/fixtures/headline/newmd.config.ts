import { z } from 'zod'
import { defineConfig } from '../../../src/index'

export default (defineConfig({
    titleMapping: 'headline',
    schemas: {
        blog: z.object({
            headline: z.string(),
        }),
    },
}))
