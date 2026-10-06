import test from 'ava';
import { expect } from 'chai';

import { getTypeInfo } from '../src/utils/schema-utils.js';

test('schema-utils.js getTypeInfo returns the examples of a schema as they are', t => {
  expect(getTypeInfo({ type: 'string', examples: ['apple', 'banana', 'pear'] }).example).to.deep.equal(['apple', 'banana', 'pear']);
  expect(getTypeInfo({ type: 'integer', examples: [1, 2, 3] }).example).to.deep.equal([1, 2, 3]);
  expect(getTypeInfo({ type: 'object', examples: [{ id: 1 }, { id: 2 }] }).example).to.deep.equal([{ id: 1 }, { id: 2 }]);
  t.pass();
});

test('schema-utils.js getTypeInfo keeps a single entry of examples as a list', t => {
  expect(getTypeInfo({ type: 'string', examples: ['apple'] }).example).to.deep.equal(['apple']);
  t.pass();
});

test('schema-utils.js getTypeInfo hands the examples to the schema views as a list', t => {
  const info = getTypeInfo({ type: 'string', examples: ['apple', 'banana'] });

  expect(JSON.parse(info.html).example).to.deep.equal(['apple', 'banana']);
  t.pass();
});

test('schema-utils.js getTypeInfo does not change a single example', t => {
  expect(getTypeInfo({ type: 'string', example: 'apple' }).example).to.equal('apple');
  // a single example of an array type is one value, so it is left for the caller to display
  expect(getTypeInfo({ type: 'array', items: { type: 'string' }, example: ['a', 'b'] }).example).to.deep.equal(['a', 'b']);
  t.pass();
});

test('schema-utils.js getTypeInfo prefers the examples over a single example', t => {
  expect(getTypeInfo({ type: 'string', examples: ['apple', 'banana'], example: 'pear' }).example).to.deep.equal(['apple', 'banana']);
  t.pass();
});
