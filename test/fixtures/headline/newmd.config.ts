import type { Config } from '@/types'
import { z } from 'zod'

export default ({
    titleMapping: 'headline',
    schemas: {
        blog: z.object({
            heading: z.string(),
        }),
    },
}) as Config
