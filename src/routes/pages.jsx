
import Login from "views/Login/Login.jsx";
import Forgot from "views/Login/Forgot.jsx";
import Passwordreset from "views/Login/Passwordreset.jsx";
import Register from "views/Register/Register.jsx";
import OrgRegister from "views/Register/Organizationregister.jsx";
import Basicinfo from "views/Register/Basicinfo.jsx";
import Goal from "views/Register/Goal.jsx";
import Organization from "views/Register/Organization.jsx";
import Emailverification from "views/Register/Emailverification.jsx";
import Welcome from "views/Login/Welcome.jsx"
const pagesRoutes = [
  {
    path: "/App/Login",
    component: Login
  },
  {
    path: "/App/Welcome",
    component: Welcome
  },
  {
    path: "/App/Register",
    component: Register
  },
  {
    path: "/App/Organizationregister",
    component: OrgRegister
  },
  {
    path: "/App/Organization",
    component: Organization
  },
  {
    path: "/App/Basicinfo",
    component: Basicinfo
  },
  {
    path: "/App/Goal",
    component: Goal
  },
  {
    path: "/App/Forgot",
    component: Forgot
  },
  {
    path: "/App/Emailverification",
    component: Emailverification
  },
  {
    path: "/App/Resetpassword",
    component: Passwordreset
  },
  {
    redirect: true,
    path: "/App",
    pathTo: "/App/Login",
    name: "Login Page"
  }
];

export default pagesRoutes;