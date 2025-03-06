import type { DefaultOptions } from '@/types'
import { z } from 'zod'

export const DEFAULT_OPTIONS: DefaultOptions = {
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
}
