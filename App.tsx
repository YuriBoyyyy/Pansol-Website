import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { HiHome, HiNewspaper } from "react-icons/hi";
import {
  BsFillInfoCircleFill,
  BsFillChatSquareTextFill,
  BsCalendar2EventFill,
} from "react-icons/bs";
import { lazy, Suspense } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { Box, Flex } from "@chakra-ui/react";
import { MdOutlinePlace } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Logo from "./assets/Logo.svg";
import Footer from "./components/footer/Footer";
import FileComplaints from "./sections/file_complaints/FileComplaints";
import ScheduleAppointments from "./sections/schedule_appointments/ScheduleAppointments";
import GetDocuments from "./sections/get_documents/GetDocuments";
import Success from "./components/others/Success";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import { useAuth } from "./context/AuthContext";
import { db } from "./app-service/firebase-config";
import Loading from "./components/others/Loading";
import SideNavigation from "./dashboard/components/SideNavigation";
import Officials from "./dashboard/sections/officials/Officials";
import Header from "./dashboard/components/Header";
import EmailVerificationNotice from "./components/others/EmailVerificationNotice";
import SigninFirst from "./components/others/SigninFirst";
import PrivateRoutes from "./pages/PrivateRoute";
import ManageMessages from "./dashboard/sections/manage-messages/ManageMessages";
import Messages from "./sections/messages/Messages";
import TermsOfService from "./sections/terms-of-service/TermsOfService";
import PrivacyPolicy from "./sections/privacy-policy/PrivacyPolicy";
import DownloadDocumentNotice from "./components/others/DownloadDocumentNotice";
import ForgotPassword from "./pages/signin/ForgotPassword";
import PasswordResetNotice from "./components/others/PasswordResetNotice";
import ManagePopulationContext from "./context/ManagePopulationContext";
import SingleProject from "./pages/projects/components/SingleProject";
import EducationalAssistance from "./sections/educational_assistance/EducationalAssistance";
import ImageViewerComponent from "./dashboard/components/ImageViewer";
import OtherOfficials from "./pages/about/sections/OtherOfficials";

const About = lazy(() => import("./pages/about/About"));
const ManageAppointments = lazy(
  () => import("./dashboard/sections/manage-appointments/ManageAppointments")
);
const SingleDiscussion = lazy(
  () => import("./pages/forum/sections/SingleDiscussion")
);
const AllDiscussions = lazy(
  () => import("./pages/forum/sections/AllDiscussions")
);
const AllComplaints = lazy(
  () => import("./dashboard/sections/AllComplaints/AllComplaints")
);
const HealthCenterDetails = lazy(
  () => import("./pages/health_center/sections/HealthCenterDetails")
);
const ProgramDetails = lazy(
  () => import("./pages/health_center/sections/ProgramDetails")
);
const ProjectPosts = lazy(
  () => import("./dashboard/sections/projects/sections/ProjectPosts")
);
const ProjectDetails = lazy(
  () => import("./dashboard/sections/projects/sections/ProjectDetails")
);
const ManageSamahan = lazy(
  () => import("./dashboard/sections/samahan/Samahan")
);
const PopulationList = lazy(
  () => import("./sections/populationList/PopulationList")
);
const PansolOfficals = lazy(
  () => import("./pages/about/sections/PansolOfficals")
);
const Forum = lazy(() => import("./pages/forum/Forum"));
const Events = lazy(() => import("./pages/events/Events"));
const News = lazy(() => import("./pages/news/News"));
const Projects = lazy(() => import("./pages/projects/Projects"));
const Samahan = lazy(() => import("./pages/about/sections/Samahan"));
const TouristSpots = lazy(() => import("./pages/spots/TouristSpots"));
const BarangayProjectList = lazy(
  () => import("./pages/projects/sections/BarangayProjectList")
);
const SKProjectList = lazy(
  () => import("./pages/projects/sections/SKProjectList")
);
const SamahanProjectList = lazy(
  () => import("./pages/projects/sections/SamahanProjectList")
);
const HealthCenter = lazy(() => import("./pages/health_center/HealthCenter"));
const Establishments = lazy(
  () => import("./pages/establishments/Establishments")
);
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const ManageEvents = lazy(() => import("./dashboard/sections/events/Events"));
const ManageNews = lazy(() => import("./dashboard/sections/news/News"));
const ManageProjects = lazy(
  () => import("./dashboard/sections/projects/Projects")
);
const RegisteredVoters = lazy(
  () => import("./dashboard/sections/voters/RegisteredVoters")
);
const ManagePopulation = lazy(
  () => import("./dashboard/sections/manage-population/ManagePopulation")
);

interface User {
  admin: boolean;
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
  };
  username: string;
}

function App(): JSX.Element {
  const firebaseAuth = useAuth();

  const getUserInfo = async (): Promise<User | null> => {
    let data: User | null = null;

    if (firebaseAuth?.currentUser?.uid) {
      const docRef = doc(db, "users", firebaseAuth?.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      data = docSnap.data() as User;
    }

    return data;
  };

  const { data: userData, isFetched } = useQuery({
    queryKey: ["user-info", firebaseAuth?.currentUser],
    queryFn: getUserInfo,
    enabled: !!firebaseAuth?.currentUser,
  });

  if (!isFetched && firebaseAuth?.currentUser) {
    return <Loading />;
  }

  if (userData?.admin) {
    return (
      <Router>
        <Flex w="100%" h="100vh" bg="#F3F3F3">
          <SideNavigation />
          <Box w="100%" h="100vh" overflowY="scroll">
            <Header />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/manage-population"
                  element={
                    <ManagePopulationContext>
                      <ManagePopulation />
                    </ManagePopulationContext>
                  }
                />
                <Route path="/events" element={<ManageEvents />} />
                <Route path="/news" element={<ManageNews />} />
                <Route path="/voters" element={<RegisteredVoters />} />
                <Route path="/officials" element={<Officials />} />
                <Route path="/samahan" element={<ManageSamahan />} />
                <Route path="/projects" element={<ManageProjects />}>
                  <Route index element={<ProjectPosts />} />
                  <Route path=":id" element={<ProjectDetails />} />
                </Route>
                <Route
                  path="/manage-appointments"
                  element={<ManageAppointments />}
                />
                <Route
                  path="/manage-messages/:id"
                  element={<ManageMessages />}
                />
                <Route path="/manage-messages" element={<ManageMessages />} />
                <Route path="/all-complaints" element={<AllComplaints />} />
                <Route
                  path="/image-viewer"
                  element={<ImageViewerComponent />}
                />
              </Routes>
            </Suspense>
          </Box>
        </Flex>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar
        navLinks={[
          "Home",
          "About",
          "Projects",
          "Places",
          "Events",
          "News",
          "Forum",
        ]}
        logo={Logo}
        navLogo={[
          <HiHome key="Home" />,
          <BsFillInfoCircleFill key="About" />,
          <AiFillProject key="Projects" />,
          <BsCalendar2EventFill key="Events" />,
          <HiNewspaper key="News" />,
          <BsFillChatSquareTextFill key="Forum" />,
          <MdOutlinePlace key="Places" />,
        ]}
      />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="about" element={<Outlet />}>
            <Route index element={<About />} />
            <Route path=":purok" element={<PopulationList />} />
          </Route>
          <Route path="officials" element={<PansolOfficals />} />
          <Route path="samahan" element={<Samahan />} />
          <Route path="other-officials" element={<OtherOfficials />} />
          <Route path="forum" element={<Forum />}>
            <Route index element={<AllDiscussions />} />
            <Route path=":id" element={<SingleDiscussion />} />
          </Route>
          <Route path="events" element={<Events />} />
          <Route path="news" element={<News />} />
          <Route path="establishments" element={<Establishments />} />
          <Route path="health-center" element={<HealthCenter />}>
            <Route index element={<HealthCenterDetails />} />
            <Route path=":id" element={<ProgramDetails />} />
          </Route>
          <Route path="spots" element={<TouristSpots />} />
          <Route path="barangay-projects" element={<Projects />}>
            <Route index element={<BarangayProjectList />} />
            <Route path=":id" element={<SingleProject />} />
          </Route>
          <Route path="sk-projects" element={<Projects />}>
            <Route index element={<SKProjectList />} />
            <Route path=":id" element={<SingleProject />} />
          </Route>
          <Route path="samahan-projects" element={<Projects />}>
            <Route index element={<SamahanProjectList />} />
            <Route path=":id" element={<SingleProject />} />
          </Route>

          <Route path="services" element={<Outlet />}>
            <Route path="file_complaints" element={<FileComplaints />} />
            <Route
              path="educational_assistance"
              element={<EducationalAssistance />}
            />
            <Route
              path="schedule_appointments"
              element={<ScheduleAppointments />}
            />
            <Route path="get_documents" element={<Outlet />}>
              <Route index element={<GetDocuments />} />
            </Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="messages" element={<Messages />} />
          </Route>
          <Route path="success" element={<Success />} />
          <Route path="signin-first" element={<SigninFirst />} />
          <Route
            path="email-verification-notice"
            element={<EmailVerificationNotice />}
          />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="download-document-notice"
            element={<DownloadDocumentNotice />}
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="password-reset-notice"
            element={<PasswordResetNotice />}
          />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
