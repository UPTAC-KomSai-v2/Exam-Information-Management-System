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

export type BaseUser = {
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

export type StudentUser = {
    type: "student";
    details: {
        campus: string;
        program: string;
    };
} & BaseUser;

export type EmployeeUser = {
    type: "employee";
    details: {
        campus: string;
        division: string;
    };
} & BaseUser;

export type UserData = StudentUser | EmployeeUser;

export const UserContext = createContext<{
    baseUser: UserData | null;
    setBaseUser: (user: UserData | null) => void;
}>({
    baseUser: null,
    setBaseUser: () => void 0,
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [ baseUser, setBaseUser ] = useState<UserData | null>(null);
    
    useEffect(() => {
        const savedBaseUser = localStorage.getItem("baseUser");
        if(savedBaseUser) setBaseUser(JSON.parse(savedBaseUser) as UserData);
    }, []);

    useEffect(() => {
        if (baseUser) {
            localStorage.setItem("baseUser", JSON.stringify(baseUser));
        } else {
            localStorage.removeItem("baseUser");
        }
    }, [baseUser]);
    
    return (
        <UserContext.Provider value={{
            baseUser,
            setBaseUser,
        }}>
            { children }
        </UserContext.Provider>
    );
}
