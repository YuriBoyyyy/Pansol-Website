import { UserCredential } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface NavItems {
  navLinks: string[];
  navLogo: JSX.Element[];
  logo: string;
}

export interface CurrentUser {
  email: string | null;
  uid: string | null;
  photoURL: string | null;
  username: string | null;
}

export interface AuthContextModel {
  currentUser: CurrentUser | null;
  signUpUser: (email: string, password: string) => Promise<UserCredential>;
  signInUser: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  facebookSignIn: () => Promise<UserCredential>;
}

export type Profile = {
  first_name: string;
  last_name: string;
  middle_name: string;
  age: string;
  gender: string;
};

export interface UserModel {
  admin: boolean;
  email: string;
  profile: Profile;
  uid: string;
  username: string;
  avatar: string;
}

export interface ProjectData {
  banner: string;
  date_posted: Timestamp;
  description: string;
  images: string[];
  title: string;
  status: string;
  projectBy: string;
}

export interface ProjectModel {
  projectData: ProjectData;
  id: string;
}

export interface ProgramData {
  title: string;
  details: string;
  images: string[];
  date: Timestamp;
}

export interface ProgramModel {
  programData: ProgramData;
  id: string;
}
