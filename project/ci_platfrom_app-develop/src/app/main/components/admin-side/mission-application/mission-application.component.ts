import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { MissionService } from '../../../services/mission.service';
import { NgToastService } from 'ng-angular-popup';
import { APP_CONFIG } from '../../../configs/environment.config';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { Subscription } from 'rxjs';
import { MissionApplication } from '../../../interfaces/mission.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mission-application',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgxPaginationModule, CommonModule, FormsModule, FilterPipe],
  templateUrl: './mission-application.component.html',
  styleUrls: ['./mission-application.component.css']
})
export class MissionApplicationComponent implements OnInit, OnDestroy {
  applicationList: any[] = [];
  page: number = 1;
  itemsPerPages: number = 10;
  searchText: string = '';
  private unsubscribe: Subscription[] = [];

  constructor(
    private _service: MissionService,
    private _toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchMissionApplicationList();
  }

  fetchMissionApplicationList() {
    const missionApplicationSubscription = this._service.missionApplicationList().subscribe(
      (data: any) => {
        console.log('Mission Application List:', data);
        this.applicationList = data.data;
      },
      (err) => {
        this._toast.error({ detail: "ERROR", summary: err.message, duration: APP_CONFIG.toastDuration });
      }
    );
    this.unsubscribe.push(missionApplicationSubscription);
  }

  approveMissionApplication(value: MissionApplication) {
    console.log('Approving application:', value);
    const missionApplicationSubscription = this._service.missionApplicationApprove(value).subscribe(
      (data: any) => {
        if (data.result === 1) {
          this._toast.success({ detail: "SUCCESS", summary: data.message, duration: APP_CONFIG.toastDuration });
          this.fetchMissionApplicationList();
        } else {
          this._toast.error({ detail: "ERROR", summary: data.message, duration: APP_CONFIG.toastDuration });
        }
      },
      (err) => {
        this._toast.error({ detail: "ERROR", summary: err.message, duration: APP_CONFIG.toastDuration });
      }
    );
    this.unsubscribe.push(missionApplicationSubscription);
  }

  deleteMissionApplication(value: MissionApplication) {
    console.log('Deleting application:', value);
    const missionApplicationDeleteSubscription = this._service.missionApplicationDelete(value).subscribe({
      next: (data: any) => {
        console.log('Delete response:', data);
        if (data.result === 1) {
          this._toast.success({ detail: "SUCCESS", summary: data.message, duration: APP_CONFIG.toastDuration });
          this.fetchMissionApplicationList();
        } else {
          this._toast.error({ detail: "ERROR", summary: data.message || 'Delete failed', duration: APP_CONFIG.toastDuration });
        }
      },
      error: (err: any) => {
        console.error('Delete error:', err);
        const errorMessage = err.error?.message || err.message || 'An error occurred while deleting';
        this._toast.error({ detail: "ERROR", summary: errorMessage, duration: APP_CONFIG.toastDuration });
      }
    });
    this.unsubscribe.push(missionApplicationDeleteSubscription);
  }

  getStatus(status: boolean): string {
    return status ? 'Approved' : 'Pending';
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
