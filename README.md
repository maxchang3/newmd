> [!CAUTION]
> This project is still in development, the API may change in the future, please use it with caution.

<h1 align="center">➕ newmd </h1>

<p align="center">Create markdown file with frontmatter using Zod schema.</p>

<pre align="center">
  npx newmd blog "Hello World"
</pre>

<sup>\* `blog` is the default schema with some fields. You can define your own schema in the config file.</sup>

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
    path: '.',
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
