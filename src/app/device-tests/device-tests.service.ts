import { Injectable } from '@angular/core';
import { statusOf, type DeviceRecord } from './status';
@Injectable({ providedIn: 'root' })
export class DeviceTestsService {
  status(record: DeviceRecord) { return statusOf(record); }
}
