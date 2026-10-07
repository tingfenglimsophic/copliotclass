import { Component, inject, signal } from '@angular/core';
import { DeviceTestsService } from './device-tests/device-tests.service';
import { FIXTURE } from './device-tests/fixture';
import { BatchSummaryService } from './batch-summary.service';
import type { DeviceRecord } from './device-tests/status';
@Component({ selector: 'app-root', standalone: true,
  templateUrl: './app.component.html' })
export class AppComponent {
  readonly records = signal<DeviceRecord[]>(FIXTURE);
  readonly message = signal('Synthetic local fixture loaded');
  readonly deviceTests = inject(DeviceTestsService);
  private readonly batches = inject(BatchSummaryService);
  loadBatch() {
    this.batches.load('BATCH-001').subscribe({
      next: rows => { this.records.set(rows); this.message.set('Local mock APIs loaded'); },
      error: () => this.message.set('Mock APIs unavailable. Fixture stays visible.')
    });
  }
}
