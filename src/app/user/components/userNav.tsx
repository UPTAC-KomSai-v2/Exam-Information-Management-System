import NavigationBar from "@/app/components/navigationBar";
import Image from "next/image";

export default function UserNavBar({dir}:{dir: string}) {
  let notification = "/images/notification_false.png";
  let message = "/images/message_false.png";

  let defaultDir = "/user/" + dir;

  let dashboardDir =  defaultDir;
  let coursesDir = defaultDir + "/courses";
  let messagesDir = defaultDir + "/messages";
  let notificationDir = defaultDir + "/notifications";
  let profileDir = defaultDir + "/profile";
  
  return (
    < NavigationBar
    navButtons = {
      <>
        { linkButton("Dashboard", dashboardDir) }
        { linkButton("Courses", coursesDir)} 
        { linkButtonImage(notificationDir, notification, "notification", 20, 20) }
        { linkButtonImage(messagesDir, message, "message", 20, 20) }
        { linkButton("Profile", profileDir) }
      </>
    }
    />
  );
}

function linkButton(str: string, dir: string) {
  return(
    <a
      href={dir}
      rel="noopener noreferrer"
    >
      {str}
    </a>
  );
}

function linkButtonImage(dir: string, imgSrc: string, alt: string, width: number, height: number) {
  return(
    <a
      href={dir}
      rel="noopener noreferrer"
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
      />
    </a>
  );
}