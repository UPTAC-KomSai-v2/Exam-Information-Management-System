"use client";

import { UserContext } from "~/app/UserContext";
import styles from "./page.module.css";
import sharedStyles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { useContext } from "react";
import { LinkButton } from "~/app/_components/links";

export default function EmployeeProfile() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) return <p>There&apos;s no user logged in.</p>;
    if (currentUser.type !== "employee") return <p>User logged in is not employee</p>;

    const fullName = currentUser.firstName + " " + currentUser.middleName.charAt(0) + ". " + currentUser.lastName;

    return (
        <div className="page">
            <Nav scope="employee" />

            <main className={`${sharedStyles.main} main`}>
                <div className={styles.leftDiv}>
                    <p className="title22px">User Details</p>

                    <label>Name</label>
                    <p>{fullName}</p>

                    <label>Country</label>
                    <p>Philippines</p>

                    <label>College</label>
                    <p>{currentUser.college}</p>

                    <label>Role</label>
                    <p>Employee</p>
                </div>

                <div className={styles.rightDiv}>
                    <p className="title22px">User Actions</p>

                    <LinkButton href="/" className={sharedStyles.profileLink}>
                        Log Out
                    </LinkButton>

                    <LinkButton href="#" className={sharedStyles.profileLink}>
                        Edit Profile
                    </LinkButton>
                </div>
            </main>
        </div>
    );
}
