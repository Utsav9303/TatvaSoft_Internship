import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { ToastrService } from "ngx-toastr"
import { Router } from "@angular/router"
import { MissionApplication } from "../interfaces/mission.interface"
import { MissionTheme } from "../interfaces/mission.interface"
import { MissionSkill } from "../interfaces/mission.interface"
import { environment } from "../../../environments/environment"
import { API_ENDPOINTS } from "../constants/api.constants"
import { Mission } from "../interfaces/common.interface"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class MissionService {
  constructor(
    public http: HttpClient,
    public toastr: ToastrService,
    public router: Router,
  ) { }

  apiUrl = `${environment.apiBaseUrl}/api`
  imageUrl = environment.apiBaseUrl

  //Mission
  getMissionThemeList(): Observable<any> {
    console.log('Calling mission theme API:', `${this.apiUrl}${API_ENDPOINTS.COMMON.MISSION_THEME_LIST}`);
    return this.http.get<any>(`${this.apiUrl}${API_ENDPOINTS.COMMON.MISSION_THEME_LIST}`).pipe(
      map((response: any) => {
        console.log('Mission theme response:', response);
        if (response.result === 1 && response.data) {
          return {
            result: response.result,
            data: response.data.map((theme: any) => ({
              id: theme.value,
              text: theme.text
            }))
          };
        }
        return response;
      })
    );
  }

  getMissionSkillList(): Observable<MissionSkill[]> {
    return this.http.get<MissionSkill[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION_SKILL.LIST}`)
  }

  uploadDoc(data: any) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.COMMON.UPLOAD_IMAGE}`, data)
  }

  missionList(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION.LIST}`)
  }

  missionDetailById(id: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION.DETAIL}/${id}`)
  }
  
  addMission(data: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}${API_ENDPOINTS.MISSION.ADD}`, data)
  }

  updateMission(data: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}${API_ENDPOINTS.MISSION.UPDATE}`, data)
  }

  deleteMission(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${API_ENDPOINTS.MISSION.DELETE}/${id}`)
  }

  //Mission Application
  missionApplicationList(): Observable<MissionApplication[]> {
    return this.http.get<MissionApplication[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION.APPLICATION_LIST}`)
  }

  missionApplicationDelete(data: MissionApplication) {
    // const payload = {
    //   id: data.id
    // };
    console.log('Service delete payload:', data);
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.MISSION.APPLICATION_DELETE}`, data.id);
  }

  missionApplicationApprove(data: MissionApplication) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.MISSION.APPLICATION_APPROVE}`, data)
  }

  //Mission Theme
  missionThemeList(): Observable<MissionTheme[]> {
    return this.http.get<MissionTheme[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION_THEME.LIST}`)
  }

  missionThemeById(id: any): Observable<MissionTheme[]> {
    return this.http.get<MissionTheme[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION_THEME.GET_BY_ID}/${id}`)
  }

  addMissionTheme(data: MissionTheme) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.MISSION_THEME.ADD}`, data)
  }

  updateMissionTheme(data: MissionTheme) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.MISSION_THEME.UPDATE}`, data)
  }

  deleteMissionTheme(data: any) {
    return this.http.delete(`${this.apiUrl}${API_ENDPOINTS.MISSION_THEME.DELETE}${data}`)
  }

  //Mission Skill
  missionSkillList(): Observable<MissionSkill[]> {
    return this.http.get<MissionSkill[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION_SKILL.LIST}`)
  }

  missionSkillById(id: any): Observable<MissionSkill[]> {
    return this.http.get<MissionSkill[]>(`${this.apiUrl}${API_ENDPOINTS.MISSION_SKILL.GET_BY_ID}/${id}`)
  }

  addMissionSkill(data: MissionSkill) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.MISSION_SKILL.ADD}`, data)
  }
  
  updateMissionSkill(data: MissionSkill) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.MISSION_SKILL.UPDATE}`, data)
  }

  deleteMissionSkill(data: any) {
    return this.http.delete(`${this.apiUrl}${API_ENDPOINTS.MISSION_SKILL.DELETE}/${data}`)
  }
}