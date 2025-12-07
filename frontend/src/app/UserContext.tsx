"use client";

import { createContext, type ReactNode, useEffect, useState } from "react";

export type Student = {
    type: "student",
    userID: string,
    firstName: string,
    middleName: string,
    lastName: string,
    password: string,
    studentNo: string,
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

export type BaseUser = {
    type: "student" | "employee",
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    authToken: string;
    notify: {
        signature: string;
        nonce: string;
    };
};

export const UserContext = createContext<{
    currentUser: User | null;
    setCurrentUser: (user : User | null) => void;

    baseUser: BaseUser | null;
    setBaseUser: (user: BaseUser | null) => void;
}>({
    currentUser: null,
    setCurrentUser: () => void 0,

    baseUser: null,
    setBaseUser: () => void 0,
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);
    const [ baseUser, setBaseUser ] = useState<BaseUser | null>(null);
    
    useEffect(() => {
        const saved = localStorage.getItem("currentUser");
        if(saved) setCurrentUser(JSON.parse(saved) as User);

        const savedBaseUser = localStorage.getItem("baseUser");
        if(savedBaseUser) setBaseUser(JSON.parse(savedBaseUser) as BaseUser);
    }, []);
    
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    useEffect(() => {
        if (baseUser) {
            localStorage.setItem("baseUser", JSON.stringify(baseUser));
        } else {
            localStorage.removeItem("baseUser");
        }
    }, [baseUser]);
    
    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            baseUser,
            setBaseUser,
        }}>
            { children }
        </UserContext.Provider>
    );
}
