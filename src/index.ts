import type { AnyZodObject } from 'zod'
import type { Config } from '@/types'

export { z } from 'zod'

export const defineConfig = <Schemas extends Record<string, AnyZodObject>>(
    config: Config<Schemas>
): Config<Schemas> => config
