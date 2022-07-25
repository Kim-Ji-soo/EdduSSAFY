const HOST = "http://localhost:8080/api/v1/";

const USERS = "users/";

const users = {
  signup: () => HOST + USERS + "signup/",
  login: () => HOST + USERS + "login/",
};
export default users;
