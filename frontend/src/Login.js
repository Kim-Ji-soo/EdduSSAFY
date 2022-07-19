/** @format */

import React from "react";

function Login(props) {
  //const dispatch = useDispatch();
  //const [id, setId] = useState("");
  //const [password, setPassword] = useState("");
  //const [loading, setLoading] = useState(false);
  //const [msg, setMsg] = useState("");

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const userInfo = {
            id: event.target.id.value,
            password: event.target.password.value,
          };

          console.log(userInfo);
        }}
      >
        <h2>Login</h2>
        <p>
          <input type="text" name="id" placeholder="ID"></input>
        </p>
        <p>
          <input type="password" name="password" placeholder="password"></input>
        </p>
        <p>
          <button type="submit">로그인</button>
        </p>
      </form>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Login;
