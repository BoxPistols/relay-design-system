import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as previewAnnotations from './preview';

/**
 * Storybook stories の runtime annotations (decorators / parameters /
 * globalTypes) を Vitest の test 側にも注入する。
 *
 * 10.3 時点で preview.tsx を `definePreview(...)` で書いていれば、
 * default export を setProjectAnnotations に渡すだけで OK。
 */
const project = setProjectAnnotations([
  previewAnnotations.default as any,
]);

beforeAll(project.beforeAll);
