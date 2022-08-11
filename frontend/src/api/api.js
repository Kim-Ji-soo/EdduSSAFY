const HOST = "https://i7c111.p.ssafy.io/api/v1/";

const USERS = "users/";
const EMAIL = "email/";
const QUIZ = "quiz/";
const QUIZBOOK = "quizbook/";
const ROOM = "room/";
const USER_ROOM = "user_room/";

const room = {
  createRoom: () => HOST + ROOM + "create/",
  joinRoom: () => HOST + USER_ROOM + "enter/",
  leaveRoom: () => HOST + USER_ROOM + "quit/",
  getRoom: () => HOST + ROOM + "allrooms/",
};

const users = {
  signup: () => HOST + USERS + "signup/",
  login: () => HOST + USERS + "login/",
  me: () => HOST + USERS + "me/",
  idcheck: () => HOST + USERS + "idcheck/",
  update: () => HOST + USERS + "update/",
};

const email = {
  emailConfirm: () => HOST + EMAIL + "emailConfirm/",
};

const quiz = {
  createQuiz: () => HOST + QUIZ + "createQuiz/",
  updateQuiz: () => HOST + QUIZ + "alterQuiz",
};

const quizbook = {
  createQuizbook: () => HOST + QUIZBOOK + "create/",
  getQuizbook: () => HOST + QUIZBOOK + "getQuizbookCombs/",
};
export { email, quiz, quizbook, room };
export default users;
