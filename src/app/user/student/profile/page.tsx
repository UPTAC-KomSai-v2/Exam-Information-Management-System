"use client";
import { UserContext } from "~/app/UserContext";
import styles from "./page.module.css";
import sharedStyles from "~/app/user/components/shared.module.css";
import Nav from "~/app/user/components/userNav";
import { useContext } from "react";
import { LinkButton } from "~/app/_components/links";

export default function StudentProfile() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) return <p>No user is logged in</p>;
    if (currentUser.type !== "student") return <p>User logged in is not a student</p>;

    const fullName = currentUser.firstName + " " + currentUser.middleName.charAt(0) + ". " + currentUser.lastName;

    return (
        <div className="page">
            <Nav scope="student" />

            <main className={`${sharedStyles.main} main`}>
                <div className={styles.leftDiv}>
                    <p className="title22px">User Details</p>

                    <label>Name</label>
                    <p>{fullName}</p>

                    <label>Country</label>
                    <p>Philippines</p>

                    <label>Program</label>
                    <p>{currentUser.program}</p>

                    <label>Role</label>
                    <p>Student</p>
                </div>

                <div className={styles.rightDiv}>
                    <p className="title22px">User Actions</p>

                    <LinkButton href="/" className="">
                      Log Out
                    </LinkButton>

                    <LinkButton href="#">
                      Edit Profile
                    </LinkButton>
                </div>
            </main>
        </div>
    );
}
