# Requirements CLI Tool

Requirements is a Node.js TypeScript CLI tool that validates software requirements for projects. It checks if required software versions are installed and provides custom validation functionality.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites

- Node.js version ^20.0.0 || ^22.0.0 || >= 24.0.0 (check with `node --version`)
- Yarn 1.x or npm (yarn is preferred, project uses yarn.lock)

### Bootstrap, Build, and Test

Execute these commands in sequence for a fresh clone:

1. **Install dependencies**:
   - `yarn install` -- takes ~12 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
   - Alternative: `npm install` (works but yarn is preferred)

2. **Build the project**:
   - `yarn build` -- takes ~2 seconds. Set timeout to 60+ seconds.
   - Alternative: `npm run build`

3. **Run tests**:
   - `yarn test` -- takes ~1-2 seconds. Set timeout to 120+ seconds.
   - Alternative: `npm test`

4. **Run linting**:
   - `yarn lint` -- takes ~1 second. Set timeout to 60+ seconds.
   - Alternative: `npm run lint`

### Other Commands

- **Clean build artifacts**: `yarn clean` or `npm run clean`
- **Test with coverage**: `yarn coverage` or `npm run coverage` -- takes ~2 seconds. Set timeout to 120+ seconds.
- **Fix formatting**: `yarn lint:fix` or `npm run lint:fix`

## CLI Usage and Testing

### Testing the CLI

After building, test the CLI functionality:

1. **Check version**: `node bin/requirements.js --version`
2. **Show help**: `node bin/requirements.js --help`
3. **Test with example config**: `node bin/requirements.js --config tests/ok_every.config.mjs`
4. **Test initialization**:
   ```bash
   cd /tmp && mkdir test-requirements && cd test-requirements
   node /path/to/repo/bin/requirements.js --init
   node /path/to/repo/bin/requirements.js
   ```

### Validation Scenarios

Always test these end-to-end scenarios after making changes:

1. **Basic CLI functionality**:
   - Run `node bin/requirements.js --version` and verify it outputs the version
   - Run `node bin/requirements.js --help` and verify help text appears
2. **Configuration testing**:
   - Run `node bin/requirements.js --config tests/ok_every.config.mjs` and verify it passes
   - Test init command creates working config file
3. **Build validation**:
   - Ensure `yarn build` completes without errors
   - Verify dist/ directory contains compiled JavaScript and TypeScript declarations
   - Test that the built CLI still works correctly

## Key Project Structure

- **`/src`** - TypeScript source code
  - `bin.ts` - CLI entry point and argument parsing
  - `index.ts` - Main API exports
  - `requirements/` - Core requirements checking logic
  - `__tests__/` - Test files
- **`/bin`** - CLI executable script
- **`/dist`** - Compiled JavaScript output (created by build)
- **`/tests`** - Example configuration files for testing
- **`package.json`** - Project configuration with scripts
- **`tsconfig.json`** - TypeScript configuration
- **`.github/workflows/ci.yml`** - CI pipeline

## Development Workflow

### Making Changes

1. Always run the full bootstrap sequence first: `yarn install && yarn build && yarn test`
2. Make your changes to TypeScript files in `/src`
3. Build: `yarn build`
4. Test: `yarn test`
5. Lint: `yarn lint` (fix with `yarn lint:fix` if needed)
6. Test CLI functionality manually as described above

### CI Compatibility

- Always run `yarn lint` before committing - CI (.github/workflows/ci.yml) will fail if formatting is incorrect
- CI tests on Node.js 20.x, 22.x, and 24.x
- CI runs: install → build → test and coverage → lint

## Common Build Issues

- **TypeScript compilation errors**: Check `tsconfig.json` and ensure all imports are correct
- **Test failures**: Run `yarn test` to see detailed output
- **Linting failures**: Run `yarn lint:fix` to auto-fix formatting issues
- **Missing dependencies**: Delete `node_modules` and `yarn.lock`, then run `yarn install`

## Package Information

- **Package manager**: Yarn (primary), npm (alternative)
- **Test framework**: Vitest
- **Linting**: Prettier
- **Type checking**: TypeScript 5.9.2
- **Target**: ES2020 modules
- **Git hooks**: Husky for pre-commit linting

## Time Expectations

All times are measured and include 50% buffer:

- `yarn install`: ~12 seconds (timeout: 60+ seconds)
- `yarn build`: ~2 seconds (timeout: 60+ seconds)
- `yarn test`: ~1-2 seconds (timeout: 120+ seconds)
- `yarn coverage`: ~2 seconds (timeout: 120+ seconds)
- `yarn lint`: ~1 second (timeout: 60+ seconds)

**CRITICAL**: NEVER CANCEL build or test commands. Wait for completion.
