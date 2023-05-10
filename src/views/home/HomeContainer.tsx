import Login from "../login/LoginContainer";
import Company from "../company/CompanyContainer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { userApi } from "@/apis/user";
import { companyApi } from "@/apis/company";

const Home = () => {
  const ACCESS_TOKEN = useSelector(
    (state: RootState) => state.token.access_token
  );
  useEffect(() => {
    console.log("ACCESS_TOKEN", ACCESS_TOKEN);
    userApi.getUser(ACCESS_TOKEN).then((res) => {
      console.log("getuser.data", res.data);
    });
    companyApi.list(ACCESS_TOKEN).then((res) => {
      console.log("res.data", res.data);
    });
  });
  return <div>home</div>;
};

export default Home;
