⚠️WIP⚠️

<h1 align="center">➕ newmd </h1>

<p align="center">Create markdown file with frontmatter using Zod schema.</p>

<pre align="center">
  npx newmd blog "Hello World"
</pre>

<sup>\* `blog` is the default schema with some fields. You can specify your own schema in the config file.</sup>

## Usage

## CLI

Run the following command in your terminal:

```sh
npx newmd blog "Hello World"
```

or using `pnpx`(`pnpm dlx`):

```sh
pnpx newmd blog "Hello World"
```

Will create a markdown file with the following content:

```md
---
title: Hello World
description: ''
pubDate: 2025-03-09T01:57:00.000Z
---
```

<sup>\* The `pubDate` field will be the current date and time.</sup>

<sup>\* The default output path is `./src/data/blog`.</sup>

See `newmd --help` for more details, you can install it globally for convenience.

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

## Credits

This project won't be possible without [@toiroakr](https://github.com/toiroakr)'s [zod-empty](https://github.com/toiroakr/zod-empty/) and other open-source projects.

## License

[MIT](./LICENSE) License © 2024-PRESENT [Max Chang](https://github.com/maxchang3)
