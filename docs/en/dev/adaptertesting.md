---
lastChanged: 2026.05.18
---
# Adapter Testing Guide

This guide covers testing ioBroker adapters with vitest and the `@iobroker/testing` package.

## Test Setup

### Dependencies

```bash
npm install --save-dev vitest @iobroker/testing
```

### Configuration

Create `vitest.config.ts` in your project root:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        root: 'src/',
    },
});
```

Add to `tsconfig.json`:

```json
{
    "compilerOptions": {
        "types": ["vitest/globals", "node"]
    }
}
```

Add the test script to `package.json`:

```json
{
    "scripts": {
        "test": "vitest run"
    }
}
```

## Test Types

### Unit Tests

Test pure functions and logic in isolation. Place test files next to the source files:

```
src/
  lib/
    parser.ts
    parser.test.ts
    coerce.ts
    coerce.test.ts
  main.ts
```

Example unit test:

```typescript
// src/lib/parser.test.ts
import { describe, it, expect } from 'vitest';
import { parseTemperature } from './parser';

describe('parseTemperature', () => {
    it('parses valid temperature', () => {
        expect(parseTemperature('21.5°C')).toBe(21.5);
    });

    it('returns NaN for invalid input', () => {
        expect(parseTemperature('not a number')).toBeNaN();
    });

    it('handles missing input', () => {
        expect(parseTemperature(undefined as unknown as string)).toBeNaN();
    });

    it('clamps to valid range', () => {
        expect(parseTemperature('999')).toBe(100);
        expect(parseTemperature('-999')).toBe(-40);
    });
});
```

### What to Unit Test

- **Data parsing and transformation** — API responses, protocol payloads, user input
- **Coercion and validation helpers** — type guards, clamping, NaN traps
- **Decision logic** — state mapping, mode selection, threshold checks
- **Edge cases** — missing fields, wrong types, empty arrays, null values

### Integration Tests with @iobroker/testing

The `@iobroker/testing` package provides a harness to test your adapter against a real (in-memory) js-controller:

```typescript
// test/integration.test.ts
const path = require('path');
const { tests } = require('@iobroker/testing');

tests.integration(path.join(__dirname, '..'), {
    defineAdditionalTests({ suite }) {
        suite('Connection test', (getHarness) => {
            it('should start and set info.connection', async () => {
                const harness = getHarness();
                await harness.startAdapterAndWait();
                const state = await harness.states.getStateAsync(
                    'my-adapter.0.info.connection',
                );
                expect(state?.val).toBe(true);
            });
        });
    },
});
```

### Package Validation Tests

`@iobroker/testing` also validates your package structure:

```typescript
// test/package.test.ts
const path = require('path');
const { tests } = require('@iobroker/testing');

tests.packageFiles(path.join(__dirname, '..'));
```

This checks:
- `package.json` and `io-package.json` are valid and consistent
- Required files exist
- Version numbers match
- npm package contains all necessary files

## Writing Testable Code

### Extract Pure Functions

Move logic out of the adapter class into standalone functions that can be tested without mocking:

```typescript
// src/lib/coerce.ts — pure, no adapter dependency
export function coercePollInterval(val: unknown, min = 10, max = 300): number {
    const n = Number(val);
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, Math.round(n)));
}

// src/main.ts — uses the pure function
import { coercePollInterval } from './lib/coerce';

class MyAdapter extends utils.Adapter {
    private async onReady(): Promise<void> {
        const interval = coercePollInterval(this.config.pollInterval);
        this.setInterval(() => this.poll(), interval * 1000);
    }
}
```

The coerce function can be fully tested without any adapter setup:

```typescript
// src/lib/coerce.test.ts
import { describe, it, expect } from 'vitest';
import { coercePollInterval } from './coerce';

describe('coercePollInterval', () => {
    it('clamps below minimum', () => expect(coercePollInterval(1)).toBe(10));
    it('clamps above maximum', () => expect(coercePollInterval(999)).toBe(300));
    it('handles NaN', () => expect(coercePollInterval('abc')).toBe(10));
    it('handles null', () => expect(coercePollInterval(null)).toBe(10));
    it('accepts valid number', () => expect(coercePollInterval(60)).toBe(60));
});
```

### Test Edge Cases

External data is unreliable. Test what happens with:

- Missing fields (`undefined`, `null`)
- Wrong types (string where number expected)
- Empty arrays and objects
- Values at boundary limits (0, -1, MAX_SAFE_INTEGER)
- Malformed API responses

## Running Tests

```bash
npm test                    # Run all tests
npx vitest run src/lib/     # Run specific directory
npx vitest --reporter=verbose  # Verbose output
```

## CI Integration

Tests run automatically in the GitHub Actions workflow (`.github/workflows/test-and-release.yml`). The standard template tests across multiple Node.js versions to ensure compatibility.

```yaml
strategy:
    matrix:
        node-version: [20.x, 22.x]
```

Both `npm run lint` and `npm test` must pass before the deploy job can run.
