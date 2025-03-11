import type { Config } from '@/types'
import packageJson from '@/../package.json'
import { defineConfig, z } from '@/index'

export const DEFAULT_CONFIG = defineConfig({
    format: 'yaml',
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

export const LOG_LEVELS = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'SILENT'] as const

export type LogLevel = typeof LOG_LEVELS[number]
