import { useContext, useEffect, useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { ViewCardContext } from "@/context";
import useUserForm from "@/hooks/user/UserForm";

import "./login.scss";
import { userApi } from "@/apis/user";
import { HttpStatusCode } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setToken } from "@/store/reducers/token";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const ViewCard = useContext(ViewCardContext);
  const { form, handleFormChange } = useUserForm();

  const [notValidated, setNotValidated] = useState<string>("");

  const userIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const ACCESS_TOKEN = useSelector(
    (state: RootState) => state.token.access_token
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    const res = await userApi.login(form);
    if (!res.data) alert("알 수 없는 오류입니다.");
    switch (res.data.statusCode) {
      case HttpStatusCode.Ok:
        alert("로그인 성공");
        document.cookie = `access_token=${res.data.data.access_token}; path=/`;
        dispatch(setToken(res.data.data.access_token));
        navigate("/");
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

  useEffect(() => {
    if (ACCESS_TOKEN) {
      navigate("/");
    }
  });

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
