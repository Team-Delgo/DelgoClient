export interface achievementType {
  achievementsId: number;
  desc: string;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: boolean;
  name: string;
  registDt: string;
  achievementsCondition: Array<achievementsConditionType>;
}

export interface achievementsConditionType {
  achievementsConditionId: number;
  mungpleId: number;
  categoryCode: string;
  count: number;
  conditionCheck: boolean;
  registDt: string;
}
