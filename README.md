⚠️WIP⚠️

<h1 align="center">➕ newmd </h1>

<p align="center">Create markdown file with frontmatter using Zod schema.</p>

## Usage

## Configures

See `newmd --help` for more details

### Config file

```ts
// newmd.config.js / newmd.config.mjs / newmd.config.ts
import { defineConfig } from 'newmd'

export default defineConfig({
    // If true, the output frontmatter will be in TOML format.
    toml: false,
    // Root path for the markdown file.
    path: './src/data/blog',
    // Schemas for the frontmatter.
    schemas: {
        blog: z.object({
            title: z.string(),
            description: z.string().optional(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
        }),
    },
})
```

## Credits

This project won't be possible without [@toiroakr](https://github.com/toiroakr)'s [zod-empty](https://github.com/toiroakr/zod-empty/) and other open-source projects.

## License

[MIT](./LICENSE) License © 2024-PRESENT [Max Chang](https://github.com/maxchang3)
