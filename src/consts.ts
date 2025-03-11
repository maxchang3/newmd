import type { Config } from '@/types'
import packageJson from '@/../package.json'
import { defineConfig } from '@/index'
import { z } from 'zod'

export const DEFAULT_CONFIG = defineConfig({
    toml: false,
    path: '.',
    schemas: {
        blog: z.object({
            title: z.string(),
            description: z.string().optional(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
        }),
    },
    titleMapping: 'title',
} as const satisfies Required<Config>)

export { packageJson }
