import Dashboard from "views/Dashboard/Dashboard.jsx";
import Profile from "views/Profile/Profilesetup.jsx";
import Trainers from "views/Trainers/Trainers.jsx";
import Goals from "views/Dashboard/setgoals.jsx";
import Connections from "views/Connections/connections";
import Jobs from "views/Jobs/Jobs";
import Classes from "views/Classes/classes";
import Userprofile from "views/Profile/Userprofile.jsx";
import Basicinfo from "views/Profile/Basicinfo.jsx";
import Accountinfo from "views/Accountinfo/accountinfo.jsx";
import Profilewall from "views/ProfileWall/Profilewall.jsx";
import Chat from "views/Chat/chat.jsx";

var dashRoutes = [
  {
    path: "/Home",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/Goals",
    name: "Goals",
    component: Goals
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/Profilewall",
    name: "Profilewall",
    component: Profilewall
  },
  {
    path: "/Trainers",  
    name: "Dashboard",
    component: Trainers
  },
  {
    path: "/Connections",
    name: "Connections",
    component: Connections
  },
  {
    path: "/Placements",
    name: "Placements",
    component: Jobs
  },
  {
    path: "/Classes",
    name: "Classes",
    component: Classes
  },
  {
    path: "/Userprofile",
    name: "Userprofile",
    component: Userprofile
  },
  {
    path: "/Basicinfo",
    name: "Basicinfo",
    component: Basicinfo
  },
  {
    path: "/Accountinfo",
    name: "Accountinfo",
    component: Accountinfo
  },
  {
    path: "/underconstruction",
    name: "Chat",
    component: Chat
  },
  { redirect: true, path: "/", pathTo: "/App/Login", name: "Login" }
];
export default dashRoutes;
