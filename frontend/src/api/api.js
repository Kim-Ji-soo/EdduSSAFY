const HOST = "http://localhost:8080/api/v1/";

const USERS = "users/";
const EMAIL = "email/";
const QUIZ = "quiz/";

const users = {
  signup: () => HOST + USERS + "signup/",
  login: () => HOST + USERS + "login/",
  me: () => HOST + USERS + "me/",
<<<<<<< HEAD
  idcheck: () => HOST + USERS + "idcheck/",
=======
  update :() =>HOST + USERS + "update/",
>>>>>>> feature/FE-logout-update
};

const email = {
  emailConfirm: () => HOST + EMAIL + "emailConfirm/",
};

const quiz = {
  createQuiz: () => HOST + QUIZ + "createQuiz/",
}

export { email };
export default users;
