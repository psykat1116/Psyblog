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

export type AuthContextType = {
  currentuser: string;
  setCurrentUser: (currentuser: string) => void;
  login: (user:LoginUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
