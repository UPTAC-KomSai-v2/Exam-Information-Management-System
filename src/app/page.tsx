import styles from "./page.module.css";
import sharedStyles from "~/styles/shared.module.css";

import Link from "next/link";

import Nav from "~/app/_components/homepageNav";
import { api, HydrateClient } from "~/trpc/server";
import Logo from "./_components/logo";

function LinkButton(props: { href: string; text: string }) {
    return (
        <Link
            className={styles.primary}
            href={props.href}
            rel="noopener noreferrer"
        >
            {props.text}
        </Link>
    );
}

export default async function Home() {
    // const hello = await api.post.hello({ text: "from tRPC" });

    // void api.post.getLatest.prefetch();

    return (
        <HydrateClient>
            <div className={`${styles.page} ${sharedStyles.imageBackground}`}>
                <Nav />

                <main className={styles.main}>
                    <div className={styles.intro}>
                        <Logo />

                        <h1>
                        The premier Examination Information Management System for the University of the Philippines.
                        </h1>

                        <p>
                        Maroon Book can serve as the main platform for managing all of your class examinations.
                        </p>
                    </div>

                    <div className={styles.buttons}>
                        <LinkButton href="/register" text="Register an Account" />
                        <LinkButton href="/login" text="Login to an Account" />
                    </div>
                </main>
            </div>
        </HydrateClient>
    );
}
