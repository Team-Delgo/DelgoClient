export const KAKAO = {
  // REST_API_KEY: 'b40f84b68ce44634317bb5530b0166c1',
  CALL_BACK_URL: `${process.env.REACT_APP_BASE_URL}/oauth/callback/kakao`,
  KAKAO_AUTH_URL: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/callback/kakao&response_type=code`,
};

export const NAVER = {
  // CLIENT_ID: 'AsoX91fTgAHzXvMW9Mik',
  // CLIENT_SECRET: 'sLk3D0NqzW',
  // STATE_STRING: '9kgsGTfH4j7IyAkg',
  CALL_BACK_URL: `${process.env.REACT_APP_BASE_URL}/oauth/callback/naver`,
  NAVER_AUTH_URL: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_NAVER_STATE_STRING}&redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/callback/naver`,
};
