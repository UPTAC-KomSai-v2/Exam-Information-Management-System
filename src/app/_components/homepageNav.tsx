import NavigationBar from "~/app/_components/navigationBar";
import { LinkButton } from "./links";

export default function HomepageNav() {
    return (
        <NavigationBar>
            <LinkButton href="" className="">
                About Us
            </LinkButton>

            <LinkButton href="/register" className="">
                Register
            </LinkButton>

            <LinkButton href="/login" className="">
                Login
            </LinkButton>
        </NavigationBar>
    );
}
