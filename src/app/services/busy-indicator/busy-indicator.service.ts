import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyIndicatorService {

  private busyIndicatorRequestsList: any[] = [];
  private busyIndicatorSubject = new BehaviorSubject<boolean>(this.busyIndicatorRequestsList.length > 0);
  showBusyIndicator$ = this.busyIndicatorSubject.asObservable();

  show(): number {
    const id = new Date().getTime();
    this.busyIndicatorRequestsList.push(id);
    this.busyIndicatorSubject.next(this.busyIndicatorRequestsList.length > 0);
    return id;
  }

  hide(busyIndicatorId: number): void {
    this.busyIndicatorRequestsList = this.busyIndicatorRequestsList.filter(id => id !== busyIndicatorId);
    this.busyIndicatorSubject.next(this.busyIndicatorRequestsList.length > 0);
  }
}
