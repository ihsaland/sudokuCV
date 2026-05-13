import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Box, Typography, Button, Chip, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import LockIcon from '@mui/icons-material/Lock';
import { motion, AnimatePresence } from 'framer-motion';
import { useUnlockedSections } from '../context/UnlockedSectionsContext';
import BackgroundPattern from './BackgroundPattern';
import { GOLD } from '../styles/pageStyles';

// ── Types ────────────────────────────────────────────────────────────────────

interface TestCase {
  description: string;
  // receives the user's extracted function and returns pass/fail + values
  run: (fn: (...args: unknown[]) => unknown) => { result: unknown; expected: unknown; passed: boolean };
}

interface Problem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  template: string;
  functionName: string;
  testCases: TestCase[];
  requiredUnlock?: string;
}

interface TestResult {
  passed: boolean;
  description: string;
  result?: string;
  expected?: string;
  error?: string;
  elapsed: number;
}

// ── Problems ─────────────────────────────────────────────────────────────────

const problems: Problem[] = [
  // ── Easy (always available) ───────────────────────────────────────────────
  {
    id: 'deep-clone',
    title: 'Deep Clone',
    category: 'Data Structures',
    difficulty: 'Easy',
    description: `Implement deepClone(obj) that returns a deep copy of a value.

The function must handle:
- Primitives (return as-is)
- Plain objects (recursively cloned)
- Arrays (recursively cloned)
- Nested combinations of the above

Modifying the clone must never affect the original.`,
    functionName: 'deepClone',
    template: `function deepClone(obj) {
  // Your implementation
}`,
    testCases: [
      {
        description: 'Primitives pass through unchanged',
        run: (fn) => {
          const result = fn(42);
          return { result, expected: 42, passed: result === 42 };
        },
      },
      {
        description: 'Clones a flat object (different reference)',
        run: (fn) => {
          const original = { a: 1, b: 2 };
          const clone = fn(original) as typeof original;
          const passed = clone.a === 1 && clone.b === 2 && clone !== original;
          return { result: clone !== original ? 'new reference' : 'same reference', expected: 'new reference', passed };
        },
      },
      {
        description: 'Mutating clone does not affect original',
        run: (fn) => {
          const original = { x: { y: 10 } };
          const clone = fn(original) as typeof original;
          clone.x.y = 999;
          return { result: original.x.y, expected: 10, passed: original.x.y === 10 };
        },
      },
      {
        description: 'Clones nested arrays correctly',
        run: (fn) => {
          const result = fn([1, [2, [3]]]);
          return { result, expected: [1, [2, [3]]], passed: JSON.stringify(result) === JSON.stringify([1, [2, [3]]]) };
        },
      },
      {
        description: 'Clones object with array values',
        run: (fn) => {
          const result = fn({ nums: [1, 2, 3], meta: { v: 1 } });
          return { result, expected: { nums: [1, 2, 3], meta: { v: 1 } }, passed: JSON.stringify(result) === JSON.stringify({ nums: [1, 2, 3], meta: { v: 1 } }) };
        },
      },
    ],
  },

  {
    id: 'memoize',
    title: 'Memoize',
    category: 'Performance',
    difficulty: 'Easy',
    description: `Implement memoize(fn) that returns a memoized version of fn.

The memoized function must:
- Return the same result as the original for the same arguments
- Only call the original function once per unique argument set
- Use JSON-serialisable arguments as the cache key

This pattern is foundational to cost-to-serve reduction — calling expensive computations only when inputs change.`,
    functionName: 'memoize',
    template: `function memoize(fn) {
  // Your implementation
}`,
    testCases: [
      {
        description: 'Returns same result as original function',
        run: (fn) => {
          const add = (a: number, b: number) => a + b;
          const memo = (fn as (f: typeof add) => typeof add)(add);
          const result = memo(3, 4);
          return { result, expected: 7, passed: result === 7 };
        },
      },
      {
        description: 'Only calls original function once for repeated args',
        run: (fn) => {
          let callCount = 0;
          const expensive = (x: number) => { callCount++; return x * 2; };
          const memo = (fn as (f: typeof expensive) => typeof expensive)(expensive);
          memo(5); memo(5); memo(5);
          return { result: callCount, expected: 1, passed: callCount === 1 };
        },
      },
      {
        description: 'Calls original again for different arguments',
        run: (fn) => {
          let callCount = 0;
          const track = (x: number) => { callCount++; return x; };
          const memo = (fn as (f: typeof track) => typeof track)(track);
          memo(1); memo(2); memo(3);
          return { result: callCount, expected: 3, passed: callCount === 3 };
        },
      },
      {
        description: 'Caches correctly with multiple arguments',
        run: (fn) => {
          let calls = 0;
          const mul = (a: number, b: number) => { calls++; return a * b; };
          const memo = (fn as (f: typeof mul) => typeof mul)(mul);
          memo(2, 3); memo(2, 3); memo(2, 4);
          return { result: calls, expected: 2, passed: calls === 2 };
        },
      },
    ],
  },

  {
    id: 'flatten',
    title: 'Flatten Nested Array',
    category: 'Data Structures',
    difficulty: 'Easy',
    description: `Implement flatten(arr) that recursively flattens a deeply nested array into a single-level array.

Examples:
  flatten([1, 2, 3])          → [1, 2, 3]
  flatten([1, [2, 3]])        → [1, 2, 3]
  flatten([1, [2, [3, [4]]]])  → [1, 2, 3, 4]
  flatten([])                 → []

Do not use Array.prototype.flat().`,
    functionName: 'flatten',
    template: `function flatten(arr) {
  // Your implementation
}`,
    testCases: [
      {
        description: 'Already-flat array is returned unchanged',
        run: (fn) => {
          const result = fn([1, 2, 3]);
          return { result, expected: [1, 2, 3], passed: JSON.stringify(result) === '[1,2,3]' };
        },
      },
      {
        description: 'One level of nesting',
        run: (fn) => {
          const result = fn([1, [2, 3], 4]);
          return { result, expected: [1, 2, 3, 4], passed: JSON.stringify(result) === '[1,2,3,4]' };
        },
      },
      {
        description: 'Deeply nested array',
        run: (fn) => {
          const result = fn([1, [2, [3, [4, [5]]]]]);
          return { result, expected: [1, 2, 3, 4, 5], passed: JSON.stringify(result) === '[1,2,3,4,5]' };
        },
      },
      {
        description: 'Empty array',
        run: (fn) => {
          const result = fn([]);
          return { result, expected: [], passed: JSON.stringify(result) === '[]' };
        },
      },
      {
        description: 'Mixed nesting depths',
        run: (fn) => {
          const result = fn([[1, 2], [3, [4, 5]], 6]);
          return { result, expected: [1, 2, 3, 4, 5, 6], passed: JSON.stringify(result) === '[1,2,3,4,5,6]' };
        },
      },
    ],
  },

  // ── Medium (requires professional-summary unlock) ─────────────────────────
  {
    id: 'event-emitter',
    title: 'Event Emitter',
    category: 'Systems Design',
    difficulty: 'Medium',
    requiredUnlock: 'professional-summary',
    description: `Implement createEventEmitter() that returns an event bus with four methods:

  on(event, handler)    — subscribe to an event
  off(event, handler)   — unsubscribe a specific handler
  emit(event, ...args)  — call all handlers for the event with given args
  once(event, handler)  — subscribe, but auto-unsubscribe after the first call

All methods should be chainable (return this).

Event emitters are the backbone of reactive systems, logging pipelines, and distributed message brokers.`,
    functionName: 'createEventEmitter',
    template: `function createEventEmitter() {
  // Your implementation
  return {
    on(event, handler) {},
    off(event, handler) {},
    emit(event, ...args) {},
    once(event, handler) {},
  };
}`,
    testCases: [
      {
        description: 'emit calls registered handler with correct args',
        run: (fn) => {
          const emitter = (fn as () => { on: Function; emit: Function })();
          let received: unknown = null;
          emitter.on('data', (v: unknown) => { received = v; });
          emitter.emit('data', 42);
          return { result: received, expected: 42, passed: received === 42 };
        },
      },
      {
        description: 'off removes handler — no longer called after removal',
        run: (fn) => {
          const emitter = (fn as () => { on: Function; off: Function; emit: Function })();
          let count = 0;
          const handler = () => count++;
          emitter.on('x', handler);
          emitter.emit('x');
          emitter.off('x', handler);
          emitter.emit('x');
          return { result: count, expected: 1, passed: count === 1 };
        },
      },
      {
        description: 'once handler fires exactly once',
        run: (fn) => {
          const emitter = (fn as () => { once: Function; emit: Function })();
          let count = 0;
          emitter.once('ping', () => count++);
          emitter.emit('ping');
          emitter.emit('ping');
          emitter.emit('ping');
          return { result: count, expected: 1, passed: count === 1 };
        },
      },
      {
        description: 'Multiple handlers on same event all fire',
        run: (fn) => {
          const emitter = (fn as () => { on: Function; emit: Function })();
          const log: number[] = [];
          emitter.on('e', () => log.push(1));
          emitter.on('e', () => log.push(2));
          emitter.on('e', () => log.push(3));
          emitter.emit('e');
          return { result: log, expected: [1, 2, 3], passed: JSON.stringify(log) === '[1,2,3]' };
        },
      },
      {
        description: 'Emitting an event with no handlers does not throw',
        run: (fn) => {
          const emitter = (fn as () => { emit: Function })();
          let threw = false;
          try { emitter.emit('ghost'); } catch { threw = true; }
          return { result: threw, expected: false, passed: !threw };
        },
      },
    ],
  },

  {
    id: 'lru-cache',
    title: 'LRU Cache',
    category: 'Systems Design',
    difficulty: 'Medium',
    requiredUnlock: 'professional-summary',
    description: `Implement createLRUCache(capacity) that returns an LRU (Least Recently Used) cache with:

  get(key)         — return the value if present, else -1
  put(key, value)  — insert or update key. If capacity is exceeded,
                     evict the least recently used entry.

Both operations must run in O(1) time.

LRU eviction is the default policy in Redis, CPU caches, and most CDN edge nodes. Getting this right is a prerequisite for serious capacity planning.`,
    functionName: 'createLRUCache',
    template: `function createLRUCache(capacity) {
  // Your implementation
  return {
    get(key) {},
    put(key, value) {},
  };
}`,
    testCases: [
      {
        description: 'get returns -1 for missing key',
        run: (fn) => {
          const cache = (fn as (n: number) => { get: Function; put: Function })(2);
          const result = cache.get('x');
          return { result, expected: -1, passed: result === -1 };
        },
      },
      {
        description: 'put then get returns correct value',
        run: (fn) => {
          const cache = (fn as (n: number) => { get: Function; put: Function })(2);
          cache.put('a', 10);
          const result = cache.get('a');
          return { result, expected: 10, passed: result === 10 };
        },
      },
      {
        description: 'Evicts least recently used when over capacity',
        run: (fn) => {
          const cache = (fn as (n: number) => { get: Function; put: Function })(2);
          cache.put('a', 1);
          cache.put('b', 2);
          cache.put('c', 3); // 'a' should be evicted
          const result = cache.get('a');
          return { result, expected: -1, passed: result === -1 };
        },
      },
      {
        description: 'Recent access prevents eviction',
        run: (fn) => {
          const cache = (fn as (n: number) => { get: Function; put: Function })(2);
          cache.put('a', 1);
          cache.put('b', 2);
          cache.get('a');      // access 'a', making 'b' the LRU
          cache.put('c', 3);   // should evict 'b', not 'a'
          const ra = cache.get('a');
          const rb = cache.get('b');
          return { result: `a=${ra} b=${rb}`, expected: 'a=1 b=-1', passed: ra === 1 && rb === -1 };
        },
      },
      {
        description: 'Updating existing key refreshes its position',
        run: (fn) => {
          const cache = (fn as (n: number) => { get: Function; put: Function })(2);
          cache.put('a', 1);
          cache.put('b', 2);
          cache.put('a', 99);  // update 'a', making 'b' the LRU
          cache.put('c', 3);   // should evict 'b'
          const result = cache.get('a');
          return { result, expected: 99, passed: result === 99 };
        },
      },
    ],
  },

  {
    id: 'pipeline',
    title: 'Function Pipeline',
    category: 'Functional',
    difficulty: 'Medium',
    requiredUnlock: 'professional-summary',
    description: `Implement pipe(...fns) that returns a function composing fns left-to-right.

  pipe(f, g, h)(x)  ≡  h(g(f(x)))

The output of each function becomes the input of the next.
pipe() with no functions should return an identity function.

Pipelines are the foundation of stream processing, ETL workflows, and middleware chains — the connective tissue of high-throughput data architectures.`,
    functionName: 'pipe',
    template: `function pipe(...fns) {
  // Your implementation
}`,
    testCases: [
      {
        description: 'Single function pipeline',
        run: (fn) => {
          const result = (fn as (...f: Function[]) => (x: number) => number)((x: number) => x * 2)(5);
          return { result, expected: 10, passed: result === 10 };
        },
      },
      {
        description: 'Two-function pipeline (left-to-right order)',
        run: (fn) => {
          const result = (fn as (...f: Function[]) => (x: number) => number)(
            (x: number) => x + 3,
            (x: number) => x * 2,
          )(4);
          return { result, expected: 14, passed: result === 14 };
        },
      },
      {
        description: 'Three-function pipeline',
        run: (fn) => {
          const result = (fn as (...f: Function[]) => (x: number) => number)(
            (x: number) => x + 1,
            (x: number) => x * x,
            (x: number) => x - 1,
          )(4);
          return { result, expected: 24, passed: result === 24 };
        },
      },
      {
        description: 'pipe() with no args is identity',
        run: (fn) => {
          const identity = (fn as (...f: Function[]) => (x: unknown) => unknown)();
          const result = identity(42);
          return { result, expected: 42, passed: result === 42 };
        },
      },
      {
        description: 'Works with string transformations',
        run: (fn) => {
          const result = (fn as (...f: Function[]) => (x: string) => string)(
            (s: string) => s.trim(),
            (s: string) => s.toUpperCase(),
            (s: string) => `[${s}]`,
          )('  hello  ');
          return { result, expected: '[HELLO]', passed: result === '[HELLO]' };
        },
      },
    ],
  },

  // ── Hard (requires work-experience unlock) ────────────────────────────────
  {
    id: 'retry',
    title: 'Retry with Backoff',
    category: 'Resilience',
    difficulty: 'Hard',
    requiredUnlock: 'work-experience',
    description: `Implement withRetry(fn, maxAttempts) that returns a wrapped version of fn.

The wrapper must:
- Call fn, returning its result if it succeeds
- On throw, retry up to maxAttempts total attempts
- Re-throw the last error if all attempts fail
- Track attempt count accurately

In distributed systems, retry logic with backoff is table stakes for handling transient failures in downstream services, database connections, and API calls.`,
    functionName: 'withRetry',
    template: `function withRetry(fn, maxAttempts) {
  // Your implementation
}`,
    testCases: [
      {
        description: 'Succeeds on first attempt',
        run: (fn) => {
          const wrapped = (fn as (f: () => number, n: number) => () => number)(() => 42, 3);
          const result = wrapped();
          return { result, expected: 42, passed: result === 42 };
        },
      },
      {
        description: 'Retries after failure and returns result on success',
        run: (fn) => {
          let attempts = 0;
          const flaky = () => { attempts++; if (attempts < 3) throw new Error('fail'); return 'ok'; };
          const wrapped = (fn as (f: () => string, n: number) => () => string)(flaky, 5);
          const result = wrapped();
          return { result, expected: 'ok', passed: result === 'ok' && attempts === 3 };
        },
      },
      {
        description: 'Throws after exhausting all attempts',
        run: (fn) => {
          const alwaysFails = () => { throw new Error('permanent'); };
          const wrapped = (fn as (f: () => never, n: number) => () => never)(alwaysFails, 3);
          let threw = false;
          try { wrapped(); } catch { threw = true; }
          return { result: threw, expected: true, passed: threw };
        },
      },
      {
        description: 'Attempt count is exactly maxAttempts on total failure',
        run: (fn) => {
          let attempts = 0;
          const counter = () => { attempts++; throw new Error('x'); };
          const wrapped = (fn as (f: () => never, n: number) => () => never)(counter, 4);
          try { wrapped(); } catch { /* expected */ }
          return { result: attempts, expected: 4, passed: attempts === 4 };
        },
      },
    ],
  },

  {
    id: 'deep-merge',
    title: 'Deep Merge',
    category: 'Data Structures',
    difficulty: 'Hard',
    requiredUnlock: 'work-experience',
    description: `Implement deepMerge(target, source) that recursively merges source into target.

Rules:
- Plain objects: recursively merge keys from source into target
- Arrays and primitives in source always overwrite target (no array merging)
- Neither input should be mutated — return a new object
- source values take precedence over target values

This is the core of configuration merging, schema composition, and state patching in distributed config systems.`,
    functionName: 'deepMerge',
    template: `function deepMerge(target, source) {
  // Your implementation
}`,
    testCases: [
      {
        description: 'Shallow merge of flat objects',
        run: (fn) => {
          const result = (fn as (a: object, b: object) => object)({ a: 1 }, { b: 2 });
          return { result, expected: { a: 1, b: 2 }, passed: JSON.stringify(result) === '{"a":1,"b":2}' };
        },
      },
      {
        description: 'Source values overwrite target values',
        run: (fn) => {
          const result = (fn as (a: object, b: object) => { a: number })({ a: 1, b: 2 }, { a: 99 });
          return { result, expected: { a: 99, b: 2 }, passed: (result as { a: number }).a === 99 };
        },
      },
      {
        description: 'Nested objects are merged recursively',
        run: (fn) => {
          const result = (fn as (a: object, b: object) => object)(
            { x: { a: 1, b: 2 } },
            { x: { b: 99, c: 3 } },
          );
          return { result, expected: { x: { a: 1, b: 99, c: 3 } }, passed: JSON.stringify(result) === '{"x":{"a":1,"b":99,"c":3}}' };
        },
      },
      {
        description: 'Arrays overwrite, not merge',
        run: (fn) => {
          const result = (fn as (a: object, b: object) => { tags: number[] })(
            { tags: [1, 2, 3] },
            { tags: [4, 5] },
          );
          return { result, expected: { tags: [4, 5] }, passed: JSON.stringify((result as { tags: number[] }).tags) === '[4,5]' };
        },
      },
      {
        description: 'Does not mutate either input',
        run: (fn) => {
          const t = { a: { v: 1 } };
          const s = { a: { v: 2 } };
          (fn as (a: typeof t, b: typeof s) => object)(t, s);
          return { result: `t=${t.a.v} s=${s.a.v}`, expected: 't=1 s=2', passed: t.a.v === 1 && s.a.v === 2 };
        },
      },
    ],
  },

  {
    id: 'curry',
    title: 'Auto-Curry',
    category: 'Functional',
    difficulty: 'Hard',
    requiredUnlock: 'work-experience',
    description: `Implement curry(fn) that returns an auto-curried version of fn.

The curried function should:
- Accept arguments one at a time or in any grouped combination
- Return a new function until fn.length arguments have been collected
- Call the original fn once enough arguments are accumulated

  curry((a, b, c) => a + b + c)(1)(2)(3)      // 6
  curry((a, b, c) => a + b + c)(1, 2)(3)       // 6
  curry((a, b, c) => a + b + c)(1)(2, 3)       // 6
  curry((a, b, c) => a + b + c)(1, 2, 3)       // 6`,
    functionName: 'curry',
    template: `function curry(fn) {
  // Your implementation
}`,
    testCases: [
      {
        description: 'One argument at a time',
        run: (fn) => {
          const add = (a: number, b: number) => a + b;
          const result = (fn as (f: typeof add) => (a: number) => (b: number) => number)(add)(3)(4);
          return { result, expected: 7, passed: result === 7 };
        },
      },
      {
        description: 'All arguments at once (passthrough)',
        run: (fn) => {
          const mul = (a: number, b: number) => a * b;
          const result = (fn as (f: typeof mul) => (a: number, b: number) => number)(mul)(6, 7);
          return { result, expected: 42, passed: result === 42 };
        },
      },
      {
        description: 'Three-argument function, partial application',
        run: (fn) => {
          const sum3 = (a: number, b: number, c: number) => a + b + c;
          const curried = (fn as (f: typeof sum3) => Function)(sum3);
          const result = (curried(1, 2) as (c: number) => number)(3);
          return { result, expected: 6, passed: result === 6 };
        },
      },
      {
        description: 'Mixed groupings — (1)(2,3)',
        run: (fn) => {
          const sum3 = (a: number, b: number, c: number) => a * b * c;
          const curried = (fn as (f: typeof sum3) => Function)(sum3);
          const result = ((curried as Function)(2) as Function)(3, 4);
          return { result, expected: 24, passed: result === 24 };
        },
      },
    ],
  },
];

// ── Test runner ───────────────────────────────────────────────────────────────

function runTests(code: string, problem: Problem): TestResult[] {
  let userFn: ((...args: unknown[]) => unknown) | undefined;

  try {
    userFn = new Function(
      `${code}\n; return typeof ${problem.functionName} !== 'undefined' ? ${problem.functionName} : undefined;`
    )() as typeof userFn;
  } catch (e) {
    return [{ passed: false, description: 'Syntax / runtime error', error: e instanceof Error ? e.message : String(e), elapsed: 0 }];
  }

  if (typeof userFn !== 'function') {
    return [{ passed: false, description: 'Function not found', error: `'${problem.functionName}' is not defined. Make sure the function name matches exactly.`, elapsed: 0 }];
  }

  return problem.testCases.map(tc => {
    const start = performance.now();
    try {
      const { result, expected, passed } = tc.run(userFn!);
      return { passed, description: tc.description, result: JSON.stringify(result), expected: JSON.stringify(expected), elapsed: +(performance.now() - start).toFixed(3) };
    } catch (e) {
      return { passed: false, description: tc.description, error: e instanceof Error ? e.message : String(e), elapsed: +(performance.now() - start).toFixed(3) };
    }
  });
}

// ── Code editor ───────────────────────────────────────────────────────────────

interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  minRows?: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, minRows = 14 }) => {
  const taRef   = useRef<HTMLTextAreaElement>(null);
  const lnRef   = useRef<HTMLDivElement>(null);
  const lineCount = (value.match(/\n/g)?.length ?? 0) + 1;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    const { selectionStart: ss, selectionEnd: se } = ta;

    if (e.key === 'Tab') {
      e.preventDefault();
      const next = value.slice(0, ss) + '  ' + value.slice(se);
      onChange(next);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = ss + 2; });
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const lines  = value.slice(0, ss).split('\n');
      const indent = lines[lines.length - 1].match(/^(\s*)/)?.[1] ?? '';
      const next   = value.slice(0, ss) + '\n' + indent + value.slice(se);
      onChange(next);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = ss + 1 + indent.length; });
    }
  };

  const syncScroll = () => {
    if (taRef.current && lnRef.current) lnRef.current.scrollTop = taRef.current.scrollTop;
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#0d1117', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', fontFamily: '"JetBrains Mono","Fira Code","Consolas",monospace' }}>
      {/* Line numbers */}
      <Box ref={lnRef} sx={{ width: 38, flexShrink: 0, backgroundColor: '#161b22', color: 'rgba(255,255,255,0.25)', textAlign: 'right', px: 0.75, py: '12px', overflowY: 'hidden', userSelect: 'none', fontSize: '0.78rem', lineHeight: 1.6 }}>
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </Box>
      {/* Textarea */}
      <textarea
        ref={taRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          color: '#e6edf3',
          border: 'none',
          outline: 'none',
          resize: 'vertical',
          fontFamily: '"JetBrains Mono","Fira Code","Consolas",monospace',
          fontSize: '0.84rem',
          lineHeight: 1.6,
          padding: '12px',
          minHeight: `${minRows * 1.6 * 13.4}px`,
          tabSize: 2,
          whiteSpace: 'pre',
          overflowWrap: 'normal',
          overflowX: 'auto',
        }}
      />
    </Box>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

const diffColour: Record<string, string> = {
  Easy:   '#22c55e',
  Medium: '#f59e0b',
  Hard:   '#ef4444',
};

const CodingProblem: React.FC = () => {
  const { unlockedSections } = useUnlockedSections();
  const [selected, setSelected]   = useState<Problem>(problems[0]);
  const [code, setCode]           = useState(problems[0].template);
  const [results, setResults]     = useState<TestResult[] | null>(null);
  const [running, setRunning]     = useState(false);

  const isUnlocked = useCallback((p: Problem) => {
    if (!p.requiredUnlock) return true;
    return unlockedSections.includes(p.requiredUnlock);
  }, [unlockedSections]);

  const grouped = useMemo(() => {
    const g: Record<'Easy' | 'Medium' | 'Hard', Problem[]> = { Easy: [], Medium: [], Hard: [] };
    problems.forEach(p => g[p.difficulty].push(p));
    return g;
  }, []);

  const selectProblem = (p: Problem) => {
    if (!isUnlocked(p)) return;
    setSelected(p);
    setCode(p.template);
    setResults(null);
  };

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => {
      setResults(runTests(code, selected));
      setRunning(false);
    }, 30);
  };

  const handleReset = () => {
    setCode(selected.template);
    setResults(null);
  };

  const allPassed = results !== null && results.length > 0 && results.every(r => r.passed);
  const passCount = results?.filter(r => r.passed).length ?? 0;

  const unlockLabel: Record<string, string> = {
    'professional-summary': 'Solve Stable (Level 1) in the Sudoku game',
    'work-experience':       'Solve Critical (Level 3) in the Sudoku game',
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: { xs: '54px', sm: '60px' } }}>
      <BackgroundPattern />

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1.5, sm: 3 }, py: { xs: 2.5, sm: 4 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

        {/* Page header */}
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ color: GOLD, fontFamily: 'DS-DIGII, monospace', fontWeight: 700, fontSize: { xs: '1.4rem', sm: '1.8rem' }, letterSpacing: '0.04em', mb: 0.5 }}>
            Code Challenges
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: { xs: '0.82rem', sm: '0.88rem' } }}>
            Systems-focused JavaScript problems · Medium and Hard levels unlock via the Sudoku game
          </Typography>
        </Box>

        {/* Main layout */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start' }}>

          {/* ── Problem list ── */}
          <Box sx={{ width: { xs: '100%', md: 220 }, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {(['Easy', 'Medium', 'Hard'] as const).map(diff => (
              <Box key={diff}>
                <Typography sx={{ color: diffColour[diff], fontFamily: 'DS-DIGII, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 0.75, px: 0.5 }}>
                  {diff}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
                  {grouped[diff].map(p => {
                    const unlocked = isUnlocked(p);
                    const active   = selected.id === p.id;
                    return (
                      <Tooltip
                        key={p.id}
                        title={!unlocked ? (unlockLabel[p.requiredUnlock ?? ''] ?? 'Complete earlier levels') : ''}
                        placement="right"
                        arrow
                      >
                        <Box
                          onClick={() => selectProblem(p)}
                          sx={{
                            px: 1.5, py: 1,
                            borderRadius: '8px',
                            cursor: unlocked ? 'pointer' : 'not-allowed',
                            backgroundColor: active ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                            border: '1px solid',
                            borderColor: active ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.07)',
                            opacity: unlocked ? 1 : 0.45,
                            transition: 'all 0.15s ease',
                            '&:hover': unlocked ? { backgroundColor: active ? 'rgba(212,175,55,0.14)' : 'rgba(255,255,255,0.06)', borderColor: active ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.15)' } : {},
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            {!unlocked && <LockIcon sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }} />}
                            <Typography sx={{ color: active ? GOLD : 'rgba(255,255,255,0.75)', fontSize: '0.8rem', fontWeight: active ? 600 : 400, lineHeight: 1.3 }}>
                              {p.title}
                            </Typography>
                          </Box>
                          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem', mt: 0.25 }}>
                            {p.category}
                          </Typography>
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>

          {/* ── Editor panel ── */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

            {/* Problem description */}
            <Box sx={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', p: { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', sm: '1.15rem' } }}>
                  {selected.title}
                </Typography>
                <Chip label={selected.difficulty} size="small"
                  sx={{ backgroundColor: `${diffColour[selected.difficulty]}20`, color: diffColour[selected.difficulty], border: `1px solid ${diffColour[selected.difficulty]}50`, fontWeight: 600, fontSize: '0.7rem', height: 20 }} />
                <Chip label={selected.category} size="small"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', height: 20 }} />
              </Box>
              <Typography
                component="pre"
                sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.8rem', sm: '0.85rem' }, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit', m: 0 }}
              >
                {selected.description}
              </Typography>
            </Box>

            {/* Code editor */}
            <CodeEditor value={code} onChange={setCode} />

            {/* Action bar */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button
                onClick={handleRun}
                disabled={running}
                startIcon={<PlayArrowIcon />}
                sx={{
                  backgroundColor: GOLD, color: '#0a0a0a', fontWeight: 700,
                  fontSize: '0.85rem', px: 2.5, py: 0.75, borderRadius: '8px',
                  '&:hover': { backgroundColor: '#c9a227' },
                  '&.Mui-disabled': { backgroundColor: 'rgba(212,175,55,0.3)', color: 'rgba(0,0,0,0.4)' },
                }}
              >
                {running ? 'Running…' : 'Run Tests'}
              </Button>
              <Button
                onClick={handleReset}
                sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', textTransform: 'none', '&:hover': { color: 'rgba(255,255,255,0.75)' } }}
              >
                Reset
              </Button>
              {results !== null && (
                <Typography sx={{ ml: 'auto', fontSize: '0.82rem', color: allPassed ? '#22c55e' : 'rgba(255,255,255,0.5)', fontWeight: allPassed ? 700 : 400 }}>
                  {passCount}/{results.length} passed
                </Typography>
              )}
            </Box>

            {/* Test results */}
            <AnimatePresence mode="wait">
              {results !== null && (
                <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {results.map((r, i) => (
                      <Box key={i} sx={{
                        p: { xs: 1.25, sm: 1.5 }, borderRadius: '8px',
                        backgroundColor: r.passed ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                        border: '1px solid',
                        borderColor: r.passed ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)',
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: r.error || (!r.passed && r.result !== undefined) ? 0.75 : 0 }}>
                          {r.passed
                            ? <CheckCircleIcon sx={{ fontSize: '0.95rem', color: '#22c55e', flexShrink: 0 }} />
                            : <ErrorIcon sx={{ fontSize: '0.95rem', color: '#ef4444', flexShrink: 0 }} />}
                          <Typography sx={{ color: r.passed ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.75)', fontSize: '0.82rem', fontWeight: 500, flex: 1 }}>
                            {r.description}
                          </Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', flexShrink: 0 }}>
                            {r.elapsed}ms
                          </Typography>
                        </Box>
                        {r.error && (
                          <Typography component="pre" sx={{ color: '#f87171', fontSize: '0.75rem', fontFamily: 'monospace', m: 0, mt: 0.5, whiteSpace: 'pre-wrap', pl: 2.5 }}>
                            {r.error}
                          </Typography>
                        )}
                        {!r.passed && !r.error && r.result !== undefined && (
                          <Box sx={{ pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                            <Typography sx={{ color: '#f87171', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                              Got:      {r.result}
                            </Typography>
                            <Typography sx={{ color: '#86efac', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                              Expected: {r.expected}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>

                  {allPassed && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.25 }}>
                      <Box sx={{ mt: 1.5, p: 2, borderRadius: '10px', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center' }}>
                        <Typography sx={{ color: '#22c55e', fontWeight: 700, fontSize: '0.9rem', mb: 0.25 }}>
                          All tests passed
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>
                          Average: {(results.reduce((s, r) => s + r.elapsed, 0) / results.length).toFixed(2)}ms per test
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodingProblem;
