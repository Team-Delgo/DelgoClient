export interface LocationState {
  phone: string;
  email: string;
  nickname: string;
  password: string;
  isSocial: string;
  geoCode: number;
  pGeoCode: number;
}

export interface Input {
  name: string;
  birth: string | undefined;
  type: BreedType;
}

export interface IsValid {
  name: boolean;
  birth: boolean;
  type: boolean;
}

export interface croppendAreaPixelType {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface BreedType {
  breed: string;
  code: string;
}

export enum Id {
  NAME = 'name',
  BIRTH = 'birth',
  TYPE = 'type',
}

export interface petType {
  code: string;
  codeDesc: string;
  codeName: string;
  n_code: null;
  n_pCode: null;
  pcode: string;
  registDt: string;
  type: string;
}