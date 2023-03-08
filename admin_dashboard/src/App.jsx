import { Route, Switch } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import Profile from "./Auth/Profile";
import { ProtectedRoute } from "./constant";
import ContactRead from "./Contacts/ContactRead";
import Contacts from "./Contacts/Contacts";
import ContactsTrashed from "./Contacts/ContactsTrashed";
import CourseContentAdd from "./Courses/Contents/CourseContentAdd";
import CourseContentAddForm from "./Courses/Contents/CourseContentAddForm";
import CourseContentEdit from "./Courses/Contents/CourseContentEdit";
import CourseWeeks from "./Courses/Contents/CourseWeeks";
import ManageContents from "./Courses/Contents/ManageContents";
import CourseAdd from "./Courses/CourseAdd";
import CourseAll from "./Courses/CourseAll";
import CourseEdit from "./Courses/CourseEdit";
import CourseTrashed from "./Courses/CourseTrashed";
import CertificateUpload from "./Courses/Enrolled/CertificateUpload";
import EnrolledStudents from "./Courses/Enrolled/EnrolledStudents";
import ExamQueAdd from "./Exams/Contents/ExamQueAdd";
import ExamQueAddForm from "./Exams/Contents/ExamQueAddForm";
import ExamQuestionEdit from "./Exams/Contents/ExamQuestionEdit";
import ManageExams from "./Exams/Contents/ManageExams";
import ExamAdd from "./Exams/ExamAdd";
import ExamsAll from "./Exams/ExamsAll";
import P404 from "./P404";
import Gateway from "./Settings/Gateway";
import GeneralSettings from "./Settings/GeneralSettings";
import StudentAdd from "./Students/UserAdd";
import StudentsAll from "./Students/UsersAll";
import StudentTrashed from "./Students/UsersTrashed";
import CourseCategory from "./template/Category/CourseCategory";
import Dashboard from "./template/Dashboard/Dashboard";
import UserAdd from "./users/UserAdd";
import UsersAll from "./users/UsersAll";
import UsersTrashed from "./users/UsersTrashed";
import Cert from "./certs/certsall"
import AddCert from "./certs/Addcert"

function App() {
  return (
    <>
      <Switch>
        <Route path={"/login"} exact>
          {" "}
          <Login />{" "}
        </Route>
        <Route path={"/forgot-password"}>
          {" "}
          <ForgotPassword />{" "}
        </Route>


        <Route path={"/robots.txt"}>
          {" "}
          <ForgotPassword />{" "}
        </Route>

        <ProtectedRoute path={"/"} exact auth={true} component={Dashboard} />

        <ProtectedRoute
          path={"/courses/category"}
          exact
          auth={true}
          component={CourseCategory}
        />
          <ProtectedRoute
          path={"/certs/all"}
          exact
          auth={true}
          component={Cert}
        />
         <ProtectedRoute
          path={"/certs/allocate"}
          exact
          auth={true}
          component={AddCert}
        />
        <ProtectedRoute
          path={"/courses/new"}
          exact
          auth={true}
          component={CourseAdd}
        />
        <ProtectedRoute
          path={"/course/edit/:id"}
          exact
          auth={true}
          component={CourseEdit}
        />
        <ProtectedRoute
          path={"/courses/all"}
          exact
          auth={true}
          component={CourseAll}
        />
        <ProtectedRoute
          path={"/courses/trashed"}
          exact
          auth={true}
          component={CourseTrashed}
        />
        <ProtectedRoute
          path={"/courses/content-add/:id"}
          exact
          auth={true}
          component={CourseContentAdd}
        />
        <ProtectedRoute
          path={"/courses/content-edit/:id"}
          exact
          auth={true}
          component={CourseContentEdit}
        />
        <ProtectedRoute
          path={"/courses/weeks/:id"}
          exact
          auth={true}
          component={CourseWeeks}
        />
        <ProtectedRoute
          path={"/courses/manage-contents/:id"}
          exact
          auth={true}
          component={ManageContents}
        />
        <ProtectedRoute
          path={"/courses/add-content/:id"}
          exact
          auth={true}
          component={CourseContentAddForm}
        />
        <ProtectedRoute
          path={"/courses/enrolled/:id"}
          exact
          auth={true}
          component={EnrolledStudents}
        />
        <ProtectedRoute
          path={"/upload/certificate/:id/uid/:id"}
          exact
          auth={true}
          component={CertificateUpload}
        />

        <ProtectedRoute
          path={"/users/all"}
          exact
          component={UsersAll}
          auth={true}
        />
        <ProtectedRoute
          path={"/users/new"}
          exact
          component={UserAdd}
          auth={true}
        />
        <ProtectedRoute
          path={"/users/trashed"}
          exact
          component={UsersTrashed}
          auth={true}
        />

        <ProtectedRoute
          path={"/manage/contacts"}
          exact
          component={Contacts}
          auth={true}
        />
        <ProtectedRoute
          path={"/contacts"}
          exact
          component={Contacts}
          auth={true}
        />
        <ProtectedRoute
          path={"/contacts"}
          exact
          component={Contacts}
          auth={true}
        />
        <ProtectedRoute
          path={"/contacts/trashed"}
          exact
          component={ContactsTrashed}
          auth={true}
        />
        <ProtectedRoute
          path={"/contacts/read/:id"}
          exact
          component={ContactRead}
          auth={true}
        />

        <ProtectedRoute
          path={"/students/all"}
          exact
          component={StudentsAll}
          auth={true}
        />
        <ProtectedRoute
          path={"/students/new"}
          exact
          component={StudentAdd}
          auth={true}
        />
        <ProtectedRoute
          path={"/students/trashed"}
          exact
          component={StudentTrashed}
          auth={true}
        />

        <ProtectedRoute
          path={"/profile"}
          exact
          component={Profile}
          auth={true}
        />
        <ProtectedRoute
          path={"/password"}
          exact
          component={Profile}
          auth={true}
        />
        <ProtectedRoute
          path={"/settings/general"}
          exact
          component={GeneralSettings}
          auth={true}
        />
        <ProtectedRoute
          path={"/settings/gateway"}
          exact
          component={Gateway}
          auth={true}
        />

        <ProtectedRoute
          path={"/exam/new"}
          exact
          auth={true}
          component={ExamAdd}
        />
        <ProtectedRoute
          path={"/exams/all"}
          exact
          auth={true}
          component={ExamsAll}
        />
        <ProtectedRoute
          path={"/exams/question-add/:id"}
          exact
          auth={true}
          component={ExamQueAdd}
        />
        <ProtectedRoute
          path={"/exams/manage-questions/:id"}
          exact
          auth={true}
          component={ManageExams}
        />
        <ProtectedRoute
          path={"/exams/add-question-form/:id"}
          exact
          auth={true}
          component={ExamQueAddForm}
        />
        <ProtectedRoute
          path={"/exams/question-edit/:id"}
          exact
          auth={true}
          component={ExamQuestionEdit}
        />
        <Route path={"*"} exact>
          {" "}
          <P404 />{" "}
        </Route>
      </Switch>
    </>
  );
}

export default App;
