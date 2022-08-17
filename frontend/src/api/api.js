// const HOST = "http://localhost:8080/api/v1/";
const HOST = "https://i7c111.p.ssafy.io/api/v1/";
const USERS = "users/";
const QUIZ = "quiz/";
const QUIZBOOK = "quizbook/";
const ROOM = "room/";
const USER_ROOM = "user_room/";
const FILE = "file/";

const room = {
  createRoom: () => HOST + ROOM + "create/",
  joinRoom: () => HOST + USER_ROOM + "enter/",
  leaveRoom: () => HOST + USER_ROOM + "quit/",
  getRoom: () => HOST + ROOM + "allrooms/",
  getResult: () => HOST + USER_ROOM + "userList/",
  updateScore: () => HOST + USER_ROOM + "updateScore/",
  search: () => HOST + ROOM + "search/",
  check: () => HOST + ROOM + "check/",
  activeRoom: () => HOST + ROOM + "activeRooms",
};

const users = {
  signup: () => HOST + USERS + "signup/",
  login: () => HOST + USERS + "login/",
  me: () => HOST + USERS + "me/",
  idcheck: () => HOST + USERS + "idcheck/",
  update: () => HOST + USERS + "update/",
  delete: () => HOST + USERS + "delete/",
  changePassword: () => HOST + USERS + "changePassword/",
  sendEmail: () => HOST + USERS + "sendEmail/",
  confirmCode: () => HOST + USERS + "confirmCode/",
  resetPassword: () => HOST + USERS + "resetPassword",
};

const quiz = {
  createQuiz: () => HOST + QUIZ + "createQuiz/",
  updateQuiz: () => HOST + QUIZ + "alterQuiz/",
  delete: () => HOST + QUIZ + "delete/",
};

const quizbook = {
  createQuizbook: () => HOST + QUIZBOOK + "create/",
  getQuizbook: () => HOST + QUIZBOOK + "getQuizbookCombs/",
  delete: () => HOST + QUIZBOOK + "delete/",
  alter: () => HOST + QUIZBOOK + "alter/",
};

const file = {
  download: () => HOST + FILE + "download/",
};
export { quiz, quizbook, room, file };
export default users;
