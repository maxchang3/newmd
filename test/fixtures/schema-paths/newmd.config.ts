import { defineConfig, z } from '../../../src/index'

export default defineConfig({
    path: {
        blog: './content/blog',
        docs: './content/docs',
        article: './content/articles',
    },
    schemas: {
        blog: z.object({
            title: z.string(),
            description: z.string().optional(),
        }),
        docs: z.object({
            title: z.string(),
            category: z.string(),
        }),
        article: z.object({
            title: z.string(),
        }),
    },
})
