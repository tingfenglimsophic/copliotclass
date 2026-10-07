import { test } from 'node:test';
import assert from 'node:assert/strict';
import { statusOf } from '../src/app/device-tests/status.ts';
const record = (temperatures, yieldPercent = 95) =>
  ({recordId: 'r1', deviceId: 'DEV-A', temperatures, yieldPercent});
const cases = [
  ['lower boundary passes', [18], 95, 'Pass'],
  ['upper boundary passes', [30], 95, 'Pass'],
  ['below boundary fails', [17.9], 95, 'Fail'],
  ['above boundary fails', [30.1], 95, 'Fail'],
  ['yield boundary passes', [24], 95, 'Pass'],
  ['low yield fails', [24], 94.9, 'Fail'],
  ['empty readings are unknown', [], 98, 'Unknown'],
  ['all readings must qualify', [24, 30.1], 98, 'Fail'],
  ['multiple inclusive boundaries pass', [18, 24, 30], 95, 'Pass']
];
for (const [name, temperatures, yieldPercent, expected] of cases) {
  test(name, () => assert.equal(statusOf(record(temperatures, yieldPercent)), expected));
}
