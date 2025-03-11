import type { Config } from '@/types'
import type { AnyZodObject } from 'zod'

export { z } from 'zod'

export const defineConfig = <
    Schemas extends Record<string, AnyZodObject>,
>(config: Config<Schemas>): Config<Schemas> => config
