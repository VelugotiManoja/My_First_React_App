import Profile from "views/Profile/Organizationinfo.jsx";
import Organizationinfo from "views/Profile/Organizationinfo.jsx";
import Organizationdashboard from "views/Dashboard/Organizationdashboard.jsx";
import Accountinfo from "views/Accountinfo/accountinfo.jsx";

var dashRoutes = [
  {
    path: "/Organization",
    name: "Organization",
    component: Organizationdashboard
  },
  {
    path: "/Organizationinfo",
    name: "Organizationinfo",
    component: Organizationinfo
  },
  {
    path: "/Organizationprofile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/Accountinfo",
    name: "Accountinfo",
    component: Accountinfo
  },
  { redirect: true, path: "/", pathTo: "/App/Login", name: "Login" }
];
export default dashRoutes;
