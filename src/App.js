import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import AboutUs from "./pages/AboutUs";
import Users from "./pages/Users";
import Home from "./pages/Home";
import React from "react";
import Layout from "./layout";
import Courses from "./pages/Courses";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Profile from "./pages/Profile";
import AddCourse from "./components/Courses/AddCourse";
import ContactUs from "./pages/ContactUs";
import CoursePage from "./components/Courses/CoursePage";
import { useQuery } from "react-query";
import { getUserFn } from "./services/Users";
import { useDispatch } from "react-redux";
import { setUserData } from "./Redux/Actions/UserData";

function App() {
  const dispatch = useDispatch();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#121212",
      },
    },
  });
  useQuery(["user"], getUserFn, {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: localStorage.getItem("token") === null ? false : true,
    onSuccess: (res) => {
      dispatch(setUserData(res?.data[0]));
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Layout component={<Home />} />} />
            <Route path="/home" element={<Layout component={<Home />} />} />
            <Route
              path="/profile"
              element={<Layout component={<Profile />} />}
            />
            <Route
              path="/create-course"
              element={<Layout component={<AddCourse />} />}
            />
            <Route
              path="/courses"
              element={<Layout component={<Courses />} />}
            />
            <Route path="/users" element={<Layout component={<Users />} />} />
            <Route
              path="/contact"
              element={<Layout component={<ContactUs />} />}
            />
            <Route path="/about" element={<Layout component={<AboutUs />} />} />
            <Route
              path="/register"
              element={<Layout component={<Register />} />}
            />
            <Route path="/login" element={<Layout component={<LogIn />} />} />
            <Route path="/course/:id" element={<CoursePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
