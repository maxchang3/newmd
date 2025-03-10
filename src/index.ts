import type { Config } from '@/types'
import type { AnyZodObject } from 'zod'

export { z } from 'zod'

export function defineConfig<
    Schemas extends Record<string, AnyZodObject>,
>(
    config: Config<Schemas>,
): Config<Schemas> {
    return config
}
