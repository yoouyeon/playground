import { redirect } from "react-router";
import { useAuth } from "../../context/authContext";
import styles from "./home.module.css";

function Home() {
  const { user, logout } = useAuth();

  const logoutAndGoLogin = () => {
    logout();
    redirect("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className={styles.title}>로그인 성공!</h1>
      <div className={styles.welcomeContainer}>
        <img
          src={user.profileImage}
          alt="User Profile"
          className={styles.welcomeAvatar}
        />
        <p className={styles.welcomeText}>반가워요 {user.nickname}님!</p>
      </div>
      <button onClick={logoutAndGoLogin}>로그아웃</button>
    </div>
  );
}

export default Home;
