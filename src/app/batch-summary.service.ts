import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { joinBatch } from './device-tests/batch-contract';
@Injectable({ providedIn: 'root' })
export class BatchSummaryService {
  private readonly http = inject(HttpClient);
  load(batchId: string) {
    const id = encodeURIComponent(batchId);
    return forkJoin({
      readings: this.http.get<unknown>(`http://127.0.0.1:4301/batches/${id}/readings`),
      quality: this.http.get<unknown>(`http://127.0.0.1:4302/batches/${id}/quality`)
    }).pipe(map(({readings, quality}) => joinBatch(readings, quality, batchId)));
  }
}
