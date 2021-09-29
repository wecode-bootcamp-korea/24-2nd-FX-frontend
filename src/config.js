const MAIN_IP = "10.58.5.110";
export const MAIN_URL = `http://${MAIN_IP}:8000/content/list?`;
export const DETAIL_URL = `http://${MAIN_IP}:8000/content/`;
export const WISH_URL = `http://${MAIN_IP}:8000/wishlists`;
export const STREAM_URL = `http://${MAIN_IP}:8000/content/streaming/`;

const LOGIN_IP = "10.58.6.10";
export const FLIX_SIGNIN_URL = `http://${LOGIN_IP}:8000/users/sign-in`;
export const FLIX_SIGNUP_URL = `http://${LOGIN_IP}:8000/users/sign-in`;
export const KAKAO_URL = `http://${LOGIN_IP}:8000/users/kakao-login`;
export const GOOGLE_URL = `http://${LOGIN_IP}:8000/users/google-login`;
export const WISH_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE5MzIzMTExNDJ9.b1opm3drEjYmZVTHbE_EVVcWPCzTsjKexRmOCN4bLsM";
export const GOOGLE_CLIENT_ID =
  "134318900672-6uplcu4p89po232gdj8vq2i660hs0d7p.apps.googleusercontent.com";
export const GENRE_MAIN_URL = `http://${MAIN_IP}:8000/content/list?order-by=-hot&category=`;
export const GENRE_LIST_URL = `http://${MAIN_IP}:8000/content/list?limit=2&category=`;
