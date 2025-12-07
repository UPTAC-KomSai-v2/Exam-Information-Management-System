"use client";

import { createContext, type ReactNode, useEffect, useState } from "react";
import type { Course } from "./data/data";
import { api } from "~/trpc/client";

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
    courses: Course[];
    refreshCourses: () => void;
}>({
    baseUser: null,
    setBaseUser: () => void 0,
    courses: [],
    refreshCourses: () => void 0,
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [ baseUser, setBaseUser ] = useState<UserData | null>(null);
    const [ courses, setCourses ] = useState<Course[]>([]);

    function refreshCourses() {
        if (!baseUser) return;
        
        if (baseUser.type === 'employee') {
            api.user.getEmployeeCourses.query({ token: baseUser.authToken }).then(response => {
                if (response.status === 'ok') {
                    setCourses(response.data);
                } else {
                    console.error("Failed to refresh courses:", response.message);
                }
            }).catch(error => {
                console.error("Error refreshing courses:", error);
            });
        } else {
            api.user.getStudentCourses.query({ token: baseUser.authToken }).then(response => {
                if (response.status === 'ok') {
                    setCourses(response.data);
                } else {
                    console.error("Failed to refresh courses:", response.message);
                }
            }).catch(error => {
                console.error("Error refreshing courses:", error);
            });
        }
    }
    
    useEffect(() => {
        const savedBaseUser = localStorage.getItem("baseUser");
        if (savedBaseUser) {
            setBaseUser(JSON.parse(savedBaseUser) as UserData);
        }

        refreshCourses();
    }, []);

    useEffect(() => {
        if (baseUser) {
            localStorage.setItem("baseUser", JSON.stringify(baseUser));
            refreshCourses();
        } else {
            localStorage.removeItem("baseUser");
            setCourses([]);
        }
    }, [baseUser]);
    
    return (
        <UserContext.Provider value={{
            baseUser,
            setBaseUser,
            courses,
            refreshCourses,
        }}>
            { children }
        </UserContext.Provider>
    );
}
