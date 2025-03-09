import type { Config } from '@/types'
import packageJson from '@/../package.json'

import { z } from 'zod'

export const DEFAULT_CONFIG: Required<Config> = {
    toml: false,
    path: './src/data/blog',
    schemas: {
        blog: z.object({
            title: z.string(),
            description: z.string().optional(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
        }),
    },
    titleMapping: 'title',
}

export { packageJson }
