import { Component, OnDestroy, type OnInit } from "@angular/core"
import { Router, RouterModule } from "@angular/router"
import { NgToastService } from "ng-angular-popup"
import { ToastrService } from "ngx-toastr"
import { APP_CONFIG } from "src/app/main/configs/environment.config"
import { MissionService } from "src/app/main/services/mission.service"
import { HeaderComponent } from "../header/header.component"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { FormsModule } from "@angular/forms"
import { NgxPaginationModule } from "ngx-pagination"
import { CommonModule } from "@angular/common"
import { FilterPipe } from "src/app/main/pipes/filter.pipe"
import { Subscription } from "rxjs"
declare var window: any
@Component({
  selector: "app-mission",
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FormsModule, RouterModule, NgxPaginationModule, CommonModule, FilterPipe],
  templateUrl: "./mission.component.html",
  styleUrls: ["./mission.component.css"],
})
export class MissionComponent implements OnInit, OnDestroy {
  deleteModal: any
  missionList: any[] = []
  page = 1
  itemsPerPages = 10
  searchText: any = ""
  missionId: any
  unsubscribe: Subscription[] = []
  constructor(
    private _service: MissionService,
    private _toastr: ToastrService,
    private _router: Router,
    private toast: NgToastService,
  ) {}
  
  ngOnInit(): void {
    this.getMissionList()
    this.deleteModal = new window.bootstrap.Modal(document.getElementById("removeMissionModal"))
  }

  getMissionList() {
    const getMissionListSubscription = this._service.missionList().subscribe(
      (data: any) => {
        if (data.result == 1) {
          this.missionList = data.data

          this.missionList = this.missionList.map((x) => {
            return {
              id: x.id,
              missionTitle: x.missionTitle,
              missionDescription: x.missionDescription,
              missionOrganisationName: x.missionOrganisationName,
              missionOrganisationDetail: x.missionOrganisationDetail,
              countryId: x.countryId,
              cityId: x.cityId,
              missionType: x.missionType,
              startDate: x.startDate,
              endDate: x.endDate,
              totalSheets: x.totalSheets,
              registrationDeadLine: x.registrationDeadLine,
              missionTheme: x.missionThemeName,
              missionSkill: x.missionSkill,
              missionImages: x.missionImages ? this._service.imageUrl + "/" + x.missionImages : "assets/NoImg.png",
              missionDocuments: x.missionDocuments,
              missionAvilability: x.missionAvilability,
            }
          })
        } else {
          this.toast.error({ detail: "ERROR", summary: data.message, duration: APP_CONFIG.toastDuration })
        }
      },
      (err) => this.toast.error({ detail: "ERROR", summary: err.message, duration: APP_CONFIG.toastDuration }),
    )
    this.unsubscribe.push(getMissionListSubscription)
  }

  openRemoveMissionModal(id: any) {
    this.deleteModal.show()
    this.missionId = id
  }

  closeRemoveMissionModal() {
    this.deleteModal.hide()
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this mission?')) {
      const deleteMissionSubscription = this._service.deleteMission(id).subscribe(
        (data: any) => {
          if (data.result == 1) {
            this.toast.success({ detail: "SUCCESS", summary: "Mission deleted successfully", duration: APP_CONFIG.toastDuration })
            this.getMissionList()
          } else {
            this.toast.error({ detail: "ERROR", summary: data.message, duration: APP_CONFIG.toastDuration })
          }
        },
        (err) => this.toast.error({ detail: "ERROR", summary: err.message, duration: APP_CONFIG.toastDuration }),
      )
      this.unsubscribe.push(deleteMissionSubscription)
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe())
  }

  deleteMissionData() {
    const deleteMissionSubscription = this._service.deleteMission(this.missionId).subscribe(
      (data: any) => {
        if (data.result == 1) {
          this.toast.success({ detail: "SUCCESS", summary: "Mission deleted successfully", duration: APP_CONFIG.toastDuration });
          this.getMissionList();
          this.closeRemoveMissionModal();
        } else {
          this.toast.error({ detail: "ERROR", summary: data.message, duration: APP_CONFIG.toastDuration });
        }
      },
      (err) => this.toast.error({ detail: "ERROR", summary: err.message, duration: APP_CONFIG.toastDuration })
    );
    this.unsubscribe.push(deleteMissionSubscription);
  }
}
