import {test} from 'node:test';
import assert from 'node:assert/strict';
import {joinBatch} from '../src/app/device-tests/batch-contract.ts';
const env = records => ({batchId:'BATCH-001', records});
const r = (id='r1',device='A',temps=[18,30]) => ({recordId:id,deviceId:device,temperatures:temps});
const q = (id='r1',yieldPercent=95) => ({recordId:id,yieldPercent});
const run = (rs,qs) => joinBatch(rs,qs,'BATCH-001');
test('joins quality by recordId rather than array position',()=>{
 const rows=run(env([r('r1'),r('r2')]),env([q('r2',96),q('r1',95)]));
 assert.deepEqual(rows.map(x=>x.yieldPercent),[95,96]);
});
test('preserves input values and reading order',()=>{
 const rs=env([r('r2'),r('r1')]);const qs=env([q('r1'),q('r2')]);
 const before=JSON.stringify([rs,qs]); const rows=run(rs,qs);
 assert.deepEqual(rows.map(x=>x.recordId),['r2','r1']);
 rows[0].temperatures.push(99);
 assert.equal(JSON.stringify([rs,qs]),before);
});
test('allows an empty temperature list',()=>assert.deepEqual(run(env([r('r1','A',[])]),env([q()]))[0].temperatures,[]));
test('preserves repeated device IDs with distinct record IDs',()=>assert.equal(run(env([r('r1'),r('r2')]),env([q('r1'),q('r2')])).length,2));
test('rejects missing quality',()=>assert.throws(()=>run(env([r()]),env([]))));
test('rejects invalid reading schema or wrong batch',()=>{
 const invalid=[null,env(null),{batchId:'OTHER',records:[r()]},env([{...r(),recordId:''}]),
  env([{...r(),deviceId:7}]),env([{...r(),temperatures:'24'}]),env([r('r1','A',[Infinity])]),env([r('r1','A',[NaN])])];
 for(const x of invalid)assert.throws(()=>run(x,env([q()])));
});
test('rejects duplicate record IDs in either response',()=>{
 assert.throws(()=>run(env([r(),r()]),env([q()])));
 assert.throws(()=>run(env([r()]),env([q(),q()])));
});
test('rejects invalid quality schema values and orphan records',()=>{
 const invalid=[null,env(null),{batchId:'OTHER',records:[q()]},env([q('r1',101)]),
  env([q('r1',-1)]),env([q('r1',Infinity)]),env([q('r1','95')]),env([q(),q('orphan')])];
 for(const x of invalid)assert.throws(()=>run(env([r()]),x));
});
