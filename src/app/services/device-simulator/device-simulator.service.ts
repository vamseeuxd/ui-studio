import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceSimulatorService {
  private isPreviewSubject = new BehaviorSubject<string>('hide');
  isPreview$ = this.isPreviewSubject.asObservable();

  showPreview() {
    this.isPreviewSubject.next('show');
  }

  hidePreview() {
    this.isPreviewSubject.next('hide');
  }
}
