⚠️WIP⚠️

<h1 align="center">➕ newmd </h1>

<p align="center">Create markdown file with frontmatter using Zod schema.</p>

<pre align="center">
  npx newmd blog "Hello World"
</pre>

<sup>\* `blog` is the default schema with `title`, `description`, `pubDate`, and `updatedDate` fields. You can specify your own schema in the config file.</sup>

## Usage

## Config file

You need to create a config file to specify the schemas for the frontmatter. If no schema is provided, the following schema will be used:

```ts
// newmd.config.[js,mjs.ts]
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

## CLI

Run the following command in your terminal:

```sh
pnpx newmd blog "Hello World"
# or
npx newmd blog "Hello World"
# or install it globally
# npm install -g newmd
# pnpm install -g newmd
# yarn global add newmd
```

Will create a markdown file with the following content:

```md
---
title: Hello World
description: ""
pubDate: 2024-01-01T00:00:00.000Z
---
```

See `newmd --help` for more details

## Credits

This project won't be possible without [@toiroakr](https://github.com/toiroakr)'s [zod-empty](https://github.com/toiroakr/zod-empty/) and other open-source projects.

## License

[MIT](./LICENSE) License © 2024-PRESENT [Max Chang](https://github.com/maxchang3)
