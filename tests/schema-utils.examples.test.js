import test from 'ava';
import { expect } from 'chai';

import { getTypeInfo } from '../src/utils/schema-utils.js';

test('schema-utils.js getTypeInfo separates multiple examples', t => {
  const info = getTypeInfo({ type: 'string', examples: ['apple', 'banana', 'pear'] });

  expect(info.example).to.equal('apple ┃ banana ┃ pear');
  t.pass();
});

test('schema-utils.js getTypeInfo keeps a single entry of examples as is', t => {
  expect(getTypeInfo({ type: 'string', examples: ['apple'] }).example).to.equal('apple');
  t.pass();
});

test('schema-utils.js getTypeInfo writes non-string examples as JSON', t => {
  const info = getTypeInfo({ type: 'integer', examples: [1, 2, 3] });
  expect(info.example).to.equal('1 ┃ 2 ┃ 3');

  const objects = getTypeInfo({ type: 'object', examples: [{ id: 1 }, { id: 2 }] });
  expect(objects.example).to.equal('{"id":1} ┃ {"id":2}');
  t.pass();
});

test('schema-utils.js getTypeInfo falls back to example when examples is empty', t => {
  const info = getTypeInfo({ type: 'string', examples: [], example: 'apple' });

  expect(info.example).to.equal('apple');
  t.pass();
});

test('schema-utils.js getTypeInfo has no example for an empty examples list', t => {
  expect(getTypeInfo({ type: 'string', examples: [] }).example).to.equal('');
  t.pass();
});

test('schema-utils.js getTypeInfo does not change a single example', t => {
  expect(getTypeInfo({ type: 'string', example: 'apple' }).example).to.equal('apple');
  // a single example of an array type is one value, so it is left for the caller to display
  expect(getTypeInfo({ type: 'array', items: { type: 'string' }, example: ['a', 'b'] }).example).to.deep.equal(['a', 'b']);
  t.pass();
});
