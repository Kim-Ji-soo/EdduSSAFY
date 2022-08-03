const HOST = "http://localhost:8080/api/v1/";

const USERS = "users/";
const QUIZ = "quiz/";

const users = {
  signup: () => HOST + USERS + "signup/",
  login: () => HOST + USERS + "login/",
  me: () => HOST + USERS + "me/",
  createQuiz: () => HOST + QUIZ + "createQuiz/"
};
export default users;
