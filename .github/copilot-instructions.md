# Project Overview

`requirements` is a CLI tool and Node.js library for validating a project's software requirements.
It checks that required software (e.g. `node`, `git`, `npm`) is installed at the correct version.

## Architecture

### Source structure (`src/`)

- `bin.ts` — CLI entry point; parses CLI arguments and orchestrates all checks
- `index.ts` — Public API exports for programmatic use
- `types.ts` — TypeScript type definitions
- `reporter.ts` — Renders results as a terminal table with colour-coded status
- `results.ts` — Utility functions for aggregating check results
- `scaffold.ts` — Generates a starter `requirements.config.mjs` when `--init` is used
- `requirements/software.ts` — Checks installed binary versions via `binary-version`
- `requirements/custom.ts` — Runs user-defined async check functions

### Config file

Projects configure requirements in `requirements.config.mjs` at the project root:

```js
export default {
  software: {
    node: '*',
    yarn: '~1.17.3',
    nginx: {
      semver: '>= 1.16.x',
      optional: true, // won't fail if missing or wrong version
      installMessage: '<install instruction>',
      updateMessage: '<update instruction>',
    },
    httpd: {
      semver: '^1.x',
      flag: '-v', // custom flag to print version
    },
  },
  // custom async functions to verify requirements beyond software versions
  custom: {
    'Example title for custom requirements check': {
      fn: async () => {
        throw new Error('throw Error when requirement not met.');
      },
      errorMessage: 'This error message is shown when the above function throws Error',
    },
  },
};
```

## Development

### Commands

```bash
yarn install    # Install dependencies
yarn build      # Compile TypeScript → dist/
yarn test       # Run unit tests (vitest)
yarn coverage   # Run tests with coverage report
yarn lint       # Check code style (oxfmt)
yarn lint:fix   # Fix code style issues automatically
```

### Testing

Tests live in `src/__tests__/` and use [vitest](https://vitest.dev/):

| File                   | Coverage                                               |
| ---------------------- | ------------------------------------------------------ |
| `requirements.spec.ts` | `software.ts` — `checkSoftware()`, `normalizeConfig()` |
| `results.spec.ts`      | `results.ts` — `isAllOK()`, `getMessages()`            |
| `bin.spec.ts`          | `bin.ts` — integration tests using config fixtures     |

Config fixtures used by `bin.spec.ts` are in `tests/`:

| Fixture                        | Purpose                                       |
| ------------------------------ | --------------------------------------------- |
| `ok_every.config.mjs`          | All software requirements satisfied           |
| `ok_some.config.mjs`           | Some requirements not satisfied               |
| `custom-check-always_fail.mjs` | Custom check that always throws               |
| `custom-check-ssh.config.mjs`  | Example combining software + SSH custom check |

### Tech stack

| Package          | Role                                             |
| ---------------- | ------------------------------------------------ |
| `typescript`     | Source language                                  |
| `vitest`         | Test runner                                      |
| `oxfmt`          | Code formatter (prettier-compatible)             |
| `yargs`          | CLI argument parsing                             |
| `binary-version` | Reads version from a binary's `--version` output |
| `semver`         | Semantic version comparison                      |
| `chalk`          | Terminal colour output                           |
| `table`          | Terminal table rendering                         |

## Code Style

- Indentation: 2 spaces
- Quotes: single quotes
- Semicolons: yes
- Max line length: 100 characters
- Formatter: `oxfmt` (see `.oxfmtrc.json`)
- Language: TypeScript (ESM, Node.js `nodenext` module resolution)
- Imports use the `.js` extension even for `.ts` source files (required for ESM)

# Git Standards

- Use conventional commits style to describe commit messages

# Github Pull Request Standards

- Use conventional commits style to describe PR titles