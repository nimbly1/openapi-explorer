import test from 'ava';
import { expect } from 'chai';

import { formatExamples } from '../src/utils/common-utils.js';

test('common-utils.js formatExamples separates multiple examples', t => {
  expect(formatExamples(['apple', 'banana', 'pear'])).to.equal('apple ┃ banana ┃ pear');
  t.pass();
});

test('common-utils.js formatExamples keeps a single entry as is', t => {
  expect(formatExamples(['apple'])).to.equal('apple');
  t.pass();
});

test('common-utils.js formatExamples writes examples which are not text as JSON', t => {
  expect(formatExamples([1, 2, 3])).to.equal('1 ┃ 2 ┃ 3');
  expect(formatExamples([true, null])).to.equal('true ┃ null');
  expect(formatExamples([{ id: 1 }, { id: 2 }])).to.equal('{"id":1} ┃ {"id":2}');
  expect(formatExamples([['a', 'b'], ['c']])).to.equal('["a","b"] ┃ ["c"]');
  t.pass();
});

test('common-utils.js formatExamples gives an empty list no text', t => {
  expect(formatExamples([])).to.equal('');
  t.pass();
});

test('common-utils.js formatExamples does not change a single example', t => {
  expect(formatExamples('apple')).to.equal('apple');
  expect(formatExamples(5)).to.equal(5);
  expect(formatExamples('')).to.equal('');
  expect(formatExamples(undefined)).to.equal(undefined);
  const example = { id: 1 };
  expect(formatExamples(example)).to.equal(example);
  t.pass();
});
