import type { z } from '.'

export interface CreateMDConfig<S extends z.AnyZodObject> {
    schema: S
}
