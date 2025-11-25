"use client";

import { createContext, type ReactNode, useEffect, useState } from "react";

export type Student = {
    type: "student",
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

export type Employee = {
    type: "employee",
    userID: string,
    firstName: string,
    middleName: string,
    lastName: string,
    password: string,
    employeeNo: string,
    college: string,
    campus: string,
    upMail: string
};

export type User = Student | Employee;

export const UserContext = createContext<{
    currentUser: User | null;
    setCurrentUser: (user : User | null) => void;
}>({
    currentUser: null,
    setCurrentUser: () => void 0,
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);
    
    useEffect(() => {
        const saved = localStorage.getItem("currentUser");
        if(saved) setCurrentUser(JSON.parse(saved) as User);
    }, []);
    
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);
    
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            { children }
        </UserContext.Provider>
    );
}
