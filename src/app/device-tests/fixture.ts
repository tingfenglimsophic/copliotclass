import type { DeviceRecord } from './status';
export const FIXTURE: DeviceRecord[] = [
  { recordId: 'r1', deviceId: 'DEV-A', temperatures: [18], yieldPercent: 95 },
  { recordId: 'r2', deviceId: 'DEV-A', temperatures: [30], yieldPercent: 96 },
  { recordId: 'r3', deviceId: 'DEV-B', temperatures: [], yieldPercent: 98 },
  { recordId: 'r4', deviceId: 'DEV-C', temperatures: [24], yieldPercent: 94.9 }
];
