import NavigationBar from "~/app/_components/navigationBar";
import Image from "next/image";
import { LinkButton } from "~/app/_components/links";

type UserNavBarProps = {
  scope: "student" | "employee";
};

export default function UserNavBar({ scope }: UserNavBarProps) {
  return (
    <NavigationBar>
      <LinkButton href={`/user/${scope}/`} className="">
        Dashboard
      </LinkButton>

      <LinkButton href={`/user/${scope}/courses`} className="">
        Courses
      </LinkButton>

      <LinkButton href={`/user/${scope}/notifications`} className="">
        <Image
          src="/images/notification_false.png"
          alt="notification"
          width={20}
          height={20}
        />
      </LinkButton>

      <LinkButton href={`/user/${scope}/messages`} className="">
        <Image
          src="/images/message_false.png"
          alt="message"
          width={20}
          height={20}
        />
      </LinkButton>

      <LinkButton href={`/user/${scope}/profile`} className="">
        Profile
      </LinkButton>
    </NavigationBar>
  );
}
