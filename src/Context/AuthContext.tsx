import { createContext } from "react";

export type Post = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
};

export type SignUpUser = {
  name: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type currentUser = {
  id: number;
  name: string;
  email: string;
  image: string;
  gender: string;
  location: string;
  birthday: string;
  summary: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  reddit: string;
  pinterest: string;
  tumblr: string;
  work: string;
  education: string;
};

export type editUser = {
  name: boolean;
  email: boolean;
  gender: boolean;
  location: boolean;
  birthday: boolean;
  summary: boolean;
  website: boolean;
  instagram: boolean;
  facebook: boolean;
  twitter: boolean;
  reddit: boolean;
  tumblr: boolean;
  pinterest: boolean;
  work: boolean;
  education: boolean;
};

export type AuthContextType = {
  currentuser: currentUser;
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void;
  setCurrentUser: (currentuser: currentUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
