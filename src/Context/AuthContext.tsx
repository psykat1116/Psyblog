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
  image: string | null;
  isAuth: boolean;
}

export type AuthContextType = {
  currentuser: currentUser;
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void;
  setCurrentUser: (currentuser: currentUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
