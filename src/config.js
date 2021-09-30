const MAIN_IP = "13.125.236.223";
export const FLIX_TOKEN = localStorage.getItem("filx_token");
export const MAIN_URL = `http://${MAIN_IP}:8080/content/list?`;
export const DETAIL_URL = `http://${MAIN_IP}:8080/content/`;
export const WISH_URL = `http://${MAIN_IP}:8080/wishlists`;
export const STREAM_URL = `http://${MAIN_IP}:8080/content/streaming/`;

const LOGIN_URL = "http://13.125.236.223:8080/users";
export const FLIX_SIGNIN_URL = `${LOGIN_URL}/sign-in`;
export const FLIX_SIGNUP_URL = `${LOGIN_URL}/sign-up`;
export const KAKAO_URL = `${LOGIN_URL}/kakao-login`;
export const GOOGLE_URL = `${LOGIN_URL}/google-login`;

export const GOOGLE_CLIENT_ID =
  "134318900672-6uplcu4p89po232gdj8vq2i660hs0d7p.apps.googleusercontent.com";
export const GENRE_MAIN_URL = `http://${MAIN_IP}:8000/content/list?order-by=-hot&category=`;
export const GENRE_LIST_URL = `http://${MAIN_IP}:8000/content/list?limit=2&category=`;
