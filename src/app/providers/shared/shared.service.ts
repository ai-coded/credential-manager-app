import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  subject = new Subject<any>();

  emitData(payload: any) {
    this.subject.next(payload);
  }
}
