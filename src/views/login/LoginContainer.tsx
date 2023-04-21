import { useContext, useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { ViewCardContext } from "@/context";
import useUserForm from "@/hooks/user/User";

import "./login.scss";
import { userApi } from "@/apis/user";
import { HttpStatusCode } from "axios";

const Login = () => {
  const ViewCard = useContext(ViewCardContext);
  const { form, handleFormChange } = useUserForm();

  const [notValidated, setNotValidated] = useState<string>("");

  const userIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const getUser = async (token: string) => {
    const res = await userApi.getUser(token);
    console.log("res", res);
  };
  const handleSubmit = async () => {
    const res = await userApi.login(form);
    if (!res.data) alert("알 수 없는 오류입니다.");
    switch (res.data.statusCode) {
      case HttpStatusCode.Ok:
        alert("로그인 성공");
        console.log("res.data.data", res.data.data);
        await getUser(res.data.data.access_token);
        break;
      case HttpStatusCode.NotFound:
        alert("유저를 찾을 수 없습니다");
        userIdRef.current?.focus();
        setNotValidated("userId");
        break;
      case HttpStatusCode.Unauthorized:
        alert("비밀번호 오류");
        passwordRef.current?.focus();
        setNotValidated("password");
        break;
      default:
        alert("알 수 없는 오류 ");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === notValidated) setNotValidated("");
    handleFormChange(e);
  };

  return (
    <ViewCard>
      <div className="login-container">
        <span className="login-title">LOGIN</span>
        <TextField
          name="userId"
          value={form.userId}
          variant="outlined"
          label="ID"
          margin="normal"
          autoFocus
          error={notValidated === "userId"}
          onChange={handleInputChange}
          inputRef={userIdRef}
        />
        <TextField
          name="password"
          type="password"
          value={form.password}
          variant="outlined"
          label="Password"
          margin="normal"
          error={notValidated === "password"}
          onChange={handleInputChange}
          inputRef={passwordRef}
        />
        <Button
          size={"large"}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </ViewCard>
  );
};

export default Login;
