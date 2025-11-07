import NavigationBar from "./navigationBar"

export default function HomepageNav() {
  return (
    < NavigationBar
    navButtons = {
      <>
        <a
          href=""
          rel="noopener noreferrer"
        >
          About Us
        </a>
        <a
          href="/register"
          rel="noopener noreferrer"
        >
          Register
        </a>
        <a
          href="/login"
          rel="noopener noreferrer"
        >
          Login
        </a>
      </>
    }
    />
  );
}

