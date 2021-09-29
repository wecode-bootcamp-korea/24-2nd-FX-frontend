const LOGIN_IP = "10.58.6.10";
const MAIN_IP = "10.58.5.110";
export const FLIX_SIGNIN_URL = `http://${LOGIN_IP}:8000/users/sign-in`;
export const FLIX_SIGNUP_URL = `http://${LOGIN_IP}:8000/users/sign-in`;
export const KAKAO_URL = `http://${LOGIN_IP}:8000/users/kakao-login`;
export const MAIN_URL = `http://${MAIN_IP}:8000/content/list?`;
export const DETAIL_URL = `http://${MAIN_IP}:8000/content/`;
export const GOOGLE_URL = `http://${LOGIN_IP}:8000/users/google-login`;
export const GOOGLE_CLIENT_ID =
  "134318900672-6uplcu4p89po232gdj8vq2i660hs0d7p.apps.googleusercontent.com";
export const GENRE_MAIN_URL = `http://${MAIN_IP}:8000/content/list?order-by=-hot&category=`;
export const GENRE_LIST_URL = `http://${MAIN_IP}:8000/content/list?limit=2&category=`;
export const STREAM_URL = `http://${MAIN_IP}:8000/content/streaming/`;
