export interface DeviceRecord {
  recordId: string;
  deviceId: string;
  temperatures: number[];
  yieldPercent: number;
}
export type DeviceStatus = 'Pass' | 'Fail' | 'Unknown';

export function statusOf(record: DeviceRecord): DeviceStatus {
  // Deliberate workshop defects: empty data and strict boundaries.
  if (record.temperatures.length === 0) return 'Fail';
  const temperatureOk = record.temperatures.every(t => t > 18 && t < 30);
  return temperatureOk && record.yieldPercent >= 95 ? 'Pass' : 'Fail';
}
