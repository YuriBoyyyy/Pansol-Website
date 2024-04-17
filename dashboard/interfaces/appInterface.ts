export type Name = {
  first_name: string;
  last_name: string;
  middle_name: string;
};

export interface Residents {
  age: number;
  gender: string;
  name: Name;
  purok: string;
  religion: string;
  occupation: string;
  registered_voter: boolean;
  status: string;
  precinct: string;
  pwd: boolean;
  illiterate: boolean;
  vaccination_status: string;
  educational_attainment: string;
  is4ps: boolean;
  birthday: string;
  birthPlace: string;
}

export interface ResidentsModel {
  residentData: Residents;
  id: string;
}
