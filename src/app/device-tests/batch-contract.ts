import type { DeviceRecord } from './status';
// Deliberately unchecked workshop boundary. Implement R7 without changing tests.
export function joinBatch(readings: unknown, quality: unknown, expectedBatchId: string): DeviceRecord[] {
  const r = readings as { records: {recordId: string; deviceId: string; temperatures: number[]}[] };
  const q = quality as { records: {recordId: string; yieldPercent: number}[] };
  return r.records.map(row => {
    const match = q.records.find(item => item.recordId === row.recordId);
    if (!match) throw new Error(`Missing quality for ${row.recordId}`);
    return { ...row, temperatures: [...row.temperatures], yieldPercent: match.yieldPercent };
  });
}
