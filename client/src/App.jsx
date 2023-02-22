import React, { useState } from "react";
import "./css/bootstrap.min.css";

import { Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import Home from "./components/Home";
import { ProtectedRoute } from "./models/protectedRoutes";
import About from "./pages/About";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CourseView from "./pages/course/CourseView";
import CoursePlay from "./pages/CoursePlay/CoursePlay";
import DownloadCertificate from "./pages/CoursePlay/DownloadCertificate";
import GoNextContent from "./pages/CoursePlay/GoNextContent";
import Degrees from "./pages/Degrees/Degrees";
import AuthHome from "./pages/Home/AuthHome";
import MasterTrack from "./pages/MasterTrack/MasterTrack";
import MyCourse from "./pages/MyCourse/MyCourse";
import MyCourseWithChapter from "./pages/MyCourseWithChapter/MyCourseWithChapter";
import Profile from "./pages/Profile/Profile";
import SearchPage from "./pages/Search/SearchPage";
import UniversityCertificates from "./pages/UniversityCertificates/UniversityCertificates";
import NewCareer from "./ui/NewCareer/NewCareer";
import P404 from "./ui/P404/P404";
import Quiz from "./ui/Quiz/Quiz";
import EditProfile from "./ui/Settings/EditProfile";
import Help from "./ui/Settings/Help";
import Purchase from "./ui/Settings/Purchase";
import Settings from "./ui/Settings/Settings";

function App() {
  const [token, setToken] = useState();
  const [name, setMyName] = useState("...");
  const cookies = new Cookies();

  const cuser = cookies.get("token");

  return (
    <>
      <Switch>
        {!cuser ? (
          <Route exact path="/" component={Home} />
        ) : (
          <ProtectedRoute path="/" exact component={AuthHome} />
        )}

        <Route path="/signup">

          <Signup /> <br />
          <br />
        </Route>
        <Route path="/login">
          {!cuser ? <Login setToken={setToken} /> : <AuthHome />}
        </Route>
        <Route path="/forget-password">

          {!cuser ? <ForgotPassword setToken={setToken} /> : <AuthHome />}
        </Route>

        {/*  Basic Routes  */}
        <Route path="/about-us">

          <About /> <br />
          <br />
        </Route>
        <Route path="/search">

          <SearchPage /> <br />
          <br />
        </Route>
        {/*  Basic Routes  */}

        {/* <Route path="/logout" > {LOGOUT ? <Login /> : <Dashboard />}  </Route> */}
        <ProtectedRoute exact path={"/user"} component={AuthHome} />
        <ProtectedRoute exact path={"/profile"} component={Profile} />
        <ProtectedRoute exact path={"/purchases"} component={Purchase} />
        <ProtectedRoute exact path={"/settings"} component={Settings} />
        <ProtectedRoute exact path={"/edit-profile"} component={EditProfile} />
        <ProtectedRoute exact path={"/help"} component={Help} />

        <Route exact path={"/career-academy"} component={NewCareer} />
        <Route exact path={"/degrees"} component={Degrees} />
        <Route exact path={"/mastertrack"} component={MasterTrack} />

        <Route
          exact
          path={"/university-certificates"}
          component={UniversityCertificates}
        />
        <Route
          exact
          path={"/course/:category/:id/:title"}
          component={CourseView}
        />

        {/* Course Path */}
        <ProtectedRoute
          exact
          path={"/my-course/:id/:title"}
          component={MyCourse}
        />
        

        <ProtectedRoute
          exact
          path={"/my-course/:id/:title/chapter/:exam"}
          component={MyCourseWithChapter}
        />
        <ProtectedRoute
          exact
          path={"/my-course/play/:id/cnt/:id/material/:title"}
          component={CoursePlay}
        />
        <ProtectedRoute
          exact
          path={"/my-course/play/:id/cnt/:id/material/:title/chapter/:chapter"}
          component={CoursePlay}
        />
        <ProtectedRoute
          exact
          path={
            "/my-course/next-play/:id/cnt/:id/material/:title/chapter/:chapter"
          }
          component={GoNextContent}
        />
        <ProtectedRoute
          exact
          path={"/my-course/:id/download/certificate/"}
          component={DownloadCertificate}
        />
        <ProtectedRoute
          exact
          path={"/my-course/:id/exam/:examId"}
          component={Quiz}
        />
            
      
        {/* Course Path */}
        <Route exact path={"*"}>

          <P404 />
        </Route>
        {/* {console.clear()} */}
      </Switch>
    </>
  );
}

export default App;

// const restrictedRoutes = () => {
//   return <Route path="/signup" > <Signup /> <br /><br /> </Route>
// }
