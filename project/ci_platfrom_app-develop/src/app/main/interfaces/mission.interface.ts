export interface MissionTheme {
  missionThemeId?: number;
  title?: string;
  status?: boolean;
}

export interface MissionSkill {
  missionSkillId?: number;
  skillName?: string;
  status?: boolean;
}

export interface MissionApplication {
  id?: number;
  missionId?: number;
  userId?: number;
  appliedDate?: string | Date;
  status?: boolean;
  seats?: number;
  missionTitle?: string;
  userName?: string;
  missionTheme?: string;
  createdDate?: string | Date;
  modifiedDate?: string | Date;
  isDeleted?: boolean;
}
