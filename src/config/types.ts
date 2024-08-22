import type { z } from 'zod'

type BaseSchemaWithoutEffects =
  | z.AnyZodObject
  | z.ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
  | z.ZodDiscriminatedUnion<string, z.AnyZodObject[]>
  | z.ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>

export type BaseSchema =
  | BaseSchemaWithoutEffects
  | z.ZodEffects<BaseSchemaWithoutEffects>

export interface CreateMDConfig<S extends BaseSchema> {
    schema?: S
}
