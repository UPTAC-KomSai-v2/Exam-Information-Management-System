"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface Student {
  userID: string,
  firstName: string,
  middleName: string,
  lastName: string,
  studentNo: string,
  password: string,
  program: string,
  campus: string,
  upMail: string
};

export interface Faculty {
  userID: string,
  firstName: string,
  middleName: string,
  lastName: string,
  password: string,
  facultyNo: string,
  college: string,
  campus: string,
  upMail: string
}

export const UserContext = createContext<{
  currentUser: Student | Faculty | null;
  setCurrentUser: (user : Student | null | Faculty) => void;
}>({
  currentUser: null,
  setCurrentUser: () => {}
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Student|Faculty|null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if(saved) setCurrentUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser])

  return(
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      { children }
    </UserContext.Provider>
  )
}
  
