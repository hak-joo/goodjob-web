import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import SideBar from "@components/sidebar/SideBar";

import Home from "@/views/home/HomeContainer";
import Company from "@/views/company/CompanyContainer";

import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";

import Login from "./views/login/LoginContainer";

import Register from "./views/register/Register";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { setToken } from "./store/reducers/token";

interface RouteType {
  path: string;
  name: string;
  element: JSX.Element;
  icon: IconType;
}

export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    icon: AiFillHome,
  },
  {
    path: "/company",
    name: "Company",
    element: <Company />,
    icon: HiUserGroup,
  },
];

export default () => {
  const tokenReducer = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch<AppDispatch>();

  const ACCESS_TOKEN = useSelector(
    (state: RootState) => state.token.access_token
  );

  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const storedToken = cookies.find((cookie) =>
      cookie.trim().startsWith("access_token=")
    );
    if (storedToken) {
      const tokenValue = storedToken.split("=")[1];
      dispatch(setToken(tokenValue));
      setIsLogIn(true);
    }
  }, [ACCESS_TOKEN, dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="goodjob-wrapper">
          <SideBar />
          <div className="goodjob-card">
            <Routes>
              {isLogIn ? (
                routes.map((route) => {
                  return <Route path={route.path} element={route.element} />;
                })
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};
