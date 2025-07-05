<h1 align="center">➕ newmd </h1>

<p align="center">A CLI tool that creates markdown files with frontmatter using a Zod schema.</p>

<pre align="center">
  npx newmd blog "Hello World"
</pre>

<sup>\* `blog` is the default schema with some fields. You can define your own schema in the config file.</sup>

[![npm](https://img.shields.io/npm/v/newmd.svg?style=flat-square&color=444)](https://www.npmjs.com/package/newmd)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/maxchang3/newmd/ci.yml?style=flat-square&label=CI)](https://github.com/maxchang3/newmd/actions)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat-square&logo=biome)](https://biomejs.dev)
[![License](https://img.shields.io/github/license/maxchang3/newmd?style=flat-square)](LICENSE)

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

<sup>\* The `pubDate` field will be filled with `new Date()`.</sup>

You can install it globally for convenience.

### Options

See `newmd --help` for more details, following is a brief description.

<details>

```sh
newmd <schemaName> <title>
```

- `--content <value>` Set the content of the markdown file
- `--path <value>` Set the output directory
- `--slug <value>` Set the slug for the filename, if not provided, it will be generated from the slugified title.
- `--cwd <value>` Set the current working directory
- `--toml` Whether to use TOML format for frontmatter, default is `false`
- `--overwrite` Whether to overwrite the existing file, default is `false`

</details>

## Config file

You need to create a config file to define the schemas for the frontmatter.

The config structure and default values are as follows:

```ts
// newmd.config.[js,mjs,ts]
import { defineConfig, z } from 'newmd'

export default defineConfig({
    // The format of the frontmatter.
    format: 'yaml',
    
      // Root path for the markdown file.
      // Use a string for a single path applied to all schemas:
      path: '.',
      
      // Or use an object to specify different paths per schema:
      // path: {
      //   blog: './content/blog',
      //   docs: './docs',
      //   articles: './content/articles',
      // },
    
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

### Title Field Mapping

By default, newmd expects a `title` field in your schema and maps the title argument to this field. However, you can customize which field should receive the title value using the `titleMapping` option.

#### Global mapping

Use a string to apply the same field name to all schemas:

<details>

```ts
// newmd.config.ts
import { defineConfig, z } from 'newmd'

export default defineConfig({
    titleMapping: 'headline', // Map title to 'headline' field for all schemas
    schemas: {
        blog: z.object({
            headline: z.string(), // Must have 'headline' field instead of 'title'
            description: z.string().optional(),
            pubDate: z.coerce.date(),
        }),
        article: z.object({
            headline: z.string(), // All schemas must have 'headline' field
            author: z.string().optional(),
        }),
    },
})
```

</details>

#### Per-schema mapping

Use an object to specify different field names for each schema:

<details>


```ts
// newmd.config.ts
import { defineConfig, z } from 'newmd'

export default defineConfig({
    titleMapping: {
        blog: 'title',      // Blog uses 'title' field
        article: 'headline', // Article uses 'headline' field  
        docs: 'name',       // Docs uses 'name' field
    },
    schemas: {
        blog: z.object({
            title: z.string(),    // Must match the mapping
            pubDate: z.coerce.date(),
        }),
        article: z.object({
            headline: z.string(), // Must match the mapping
            author: z.string().optional(),
        }),
        docs: z.object({
            name: z.string(),     // Must match the mapping
            category: z.string().optional(),
        }),
    },
})
```

</details>


## Integration

### With [Astro](https://astro.build/)

<details>

Say you have this content config file:

```ts
// src/content.config.ts
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        permalink: z.string().optional(),
    }),
})

export const collections = { blog }
```

You can create a newmd config file like this:

```ts
// newmd.config.ts
import { defineConfig, z } from 'newmd'

export default defineConfig({
    // Corresponding to the `base` option in the content config.
    path: './src/content/blog',
    schemas: { // Copy the schema from the content config.
        blog: z.object({
            title: z.string(),
            description: z.string().optional(),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
        }),
    },
})
```

Now you can use the same schema to create markdown files with frontmatter by running `npx newmd blog "Hello World"`.

</details>

## Credits

- 🙏 Huge thanks to [@toiroakr](https://github.com/toiroakr) for [zod-empty](https://github.com/toiroakr/zod-empty/) and other awesome open-source projects.
- 🎬 Shout out to [@coding-in-public](https://github.com/coding-in-public) for the great intro video: [Watch on YouTube](https://www.youtube.com/watch?v=nhNbjt4q9Ms)


## License

[MIT](./LICENSE) License © 2024-PRESENT [Max Chang](https://github.com/maxchang3)
