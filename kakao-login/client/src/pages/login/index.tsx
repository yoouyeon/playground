import kakaoLogo from "/kakao.svg";
import styles from "./login.module.css";

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

function Login() {
  const kakaoLogin = async () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div>
      <button className={styles.kakaoLoginButton} onClick={kakaoLogin}>
        <img src={kakaoLogo} alt="Kakao Logo" />
        <span>카카오 로그인</span>
      </button>
    </div>
  );
}

export default Login;
