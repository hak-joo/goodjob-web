import ViewCard from "@/context/viewcard/ViewCard";

import { useContext } from "react";
import { Button, TextField } from "@material-ui/core";

import { ViewCardContext } from "@/context";
import useUserForm from "@/hooks/user/User";

import "./login.scss";
import { userApi } from "@/apis/user";

const Login = () => {
  const ViewCard = useContext(ViewCardContext);
  const { form, handleFormChange } = useUserForm();

  const handleSubmit = async () => {
    const res = await userApi.login(form);
  };

  return (
    <ViewCard>
      <div className="login-container">
        <span className="login-title">LOGIN</span>
        <TextField
          name="id"
          value={form.userId}
          variant="outlined"
          label="ID"
          margin="normal"
          onChange={handleFormChange}
        />
        <TextField
          name="password"
          value={form.password}
          variant="outlined"
          label="Password"
          margin="normal"
          onChange={handleFormChange}
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
