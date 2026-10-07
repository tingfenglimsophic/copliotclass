import { test } from 'node:test';
import assert from 'node:assert/strict';
import { duplicateDeviceIds } from '../src/app/device-tests/duplicates.ts';
const r = (id, i) => ({recordId: `r${i}`, deviceId: id, temperatures:[24], yieldPercent:95});
test('duplicate ID is reported once', () => {
 const rows=[r('A',1),r('A',2),r('A',3)];
 assert.deepEqual(duplicateDeviceIds(rows), ['A']);
 assert.equal(rows.length,3);
});
test('unique IDs have no warning', () => assert.deepEqual(duplicateDeviceIds([r('A',1),r('B',2)]), []));
test('empty list has no warning', () => assert.deepEqual(duplicateDeviceIds([]), []));
test('IDs use exact case sensitive comparison', () => assert.deepEqual(duplicateDeviceIds([r('A',1),r('a',2)]), []));
test('input records remain unchanged', () => {
 const rows=[r('B',1),r('A',2),r('B',3),r('A',4)];
 const before=JSON.stringify(rows);
 assert.deepEqual(duplicateDeviceIds(rows), ['B','A']);
 assert.equal(JSON.stringify(rows), before);
});
