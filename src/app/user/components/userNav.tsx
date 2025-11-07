import NavigationBar from "@/app/components/navigationBar";
import Image from "next/image";

export default function UserNavBar() {
  let notification = "/images/notification_false.png";
  let message = "/images/message_false.png";
  
  return (
    < NavigationBar
    navButtons = {
      <>
        <a
          href="/user/dashboard"
          rel="noopener noreferrer"
        >
          Dashboard
        </a>
        <a
          href="/user/courses"
          rel="noopener noreferrer"
        >
          Courses
        </a>
        <a
          href="/user/notification"
          rel="noopener noreferrer"
        >
          <Image
            src={notification}
            alt="notification"
            width={20}
            height={20}
          />
        </a>
        <a
          href="/user/message"
          rel="noopener noreferrer"
        >
          <Image
            src={message}
            alt="message"
            width={20}
            height={20}
          />
        </a>
        <a
          href="/user/profile"
          rel="noopener noreferrer"
        >
          Profile
        </a>
      </>
    }
    />
  );
}
