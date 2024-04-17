import {
  Box,
  HStack,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  MdOutlineLocalPolice,
  MdOutlineSpaceDashboard,
  MdOutlineWhereToVote,
  MdWhereToVote,
} from "react-icons/md";
import { useState } from "react";
import {
  BsCalendar3Event,
  BsFillCalendarEventFill,
  BsFillPeopleFill,
  BsPeople,
  BsPlusCircleDotted,
} from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiUserGroup } from "react-icons/hi";
import { AiOutlineProject } from "react-icons/ai";
import Logo from "../../assets/Logo(dashboard).svg";
import AddNewsModal from "./AddNewsModal";
import AddEventsModal from "./AddEventsModal";
import AddProjectsModal from "./AddProjectsModal";
import AddMemberModal from "./AddMemberModal";

function SideNavigation() {
  const [toggled, setToggled] = useState<boolean>(false);
  const {
    isOpen: isAddNewsOpen,
    onClose: onAddNewsClose,
    onOpen: onAddNewsOpen,
  } = useDisclosure();
  const {
    isOpen: isAddEventsOpen,
    onClose: onAddEventsClose,
    onOpen: onAddEventsOpen,
  } = useDisclosure();
  const {
    isOpen: isAddProjectsOpen,
    onClose: onAddProjectsClose,
    onOpen: onAddProjectsOpen,
  } = useDisclosure();
  const {
    isOpen: isAddMemberOpen,
    onClose: onAddMemberClose,
    onOpen: onAddMemberOpen,
  } = useDisclosure();

  const navigate = useNavigate();
  const navLinks = [
    { link: "/", label: "Dashboard", icon: <MdOutlineSpaceDashboard /> },
    {
      link: "manage-population",
      label: "Manage Population",
      icon: <BsPeople />,
    },
    {
      link: "voters",
      label: "Registered Voters",
      icon: <MdOutlineWhereToVote />,
    },
    {
      link: "samahan",
      label: "Samahan",
      icon: <HiUserGroup />,
      rightIcon: <BsPlusCircleDotted />,
    },
    {
      link: "events",
      label: "Events",
      icon: <BsCalendar3Event />,
      rightIcon: <BsPlusCircleDotted />,
    },
    {
      link: "news",
      label: "News",
      icon: <FaRegNewspaper />,
      rightIcon: <BsPlusCircleDotted />,
    },
    {
      link: "projects",
      label: "Projects",
      icon: <AiOutlineProject />,
      rightIcon: <BsPlusCircleDotted />,
    },
    { link: "officials", label: "Officials", icon: <MdOutlineLocalPolice /> },
  ];

  const [activeNav, setActiveNav] = useState<string>("Dashboard");

  const handleClick = (item: string) => {
    if (item === "news") {
      onAddNewsOpen();
    } else if (item === "events") {
      onAddEventsOpen();
    } else if (item === "samahan") {
      onAddMemberOpen();
    } else {
      onAddProjectsOpen();
    }
  };

  return (
    <Box
      transition="all .3s ease"
      w={toggled ? "6.7rem" : "22rem"}
      h="100vh"
      p="2rem"
      bg="#FCFCFC"
    >
      <HStack h="3rem" justify={toggled ? "center" : "space-between"}>
        {toggled ? null : <Image src={Logo} onClick={() => navigate("/")} />}
        <Box
          color="#626466"
          fontSize="1.5rem"
          onClick={() => setToggled(!toggled)}
        >
          <HiOutlineMenuAlt3 />
        </Box>
      </HStack>
      <VStack>
        {navLinks.map((item) => {
          return (
            <Link
              fontFamily="inter"
              w="100%"
              marginTop="3rem"
              p=".8rem"
              key={item.label}
              color={activeNav === item.label ? "white" : "#626466"}
              fontWeight="medium"
              _hover={{}}
              bg={activeNav === item.label ? "#FF6A55" : ""}
              borderRadius=".4rem"
              transition="all .1s ease"
              fontSize=".95rem"
              onClick={() => {
                setActiveNav(item.label);
                navigate(item.link);
              }}
            >
              <HStack w="100%" justify="space-between">
                <HStack>
                  <Box fontSize={toggled ? "1.1rem" : "1rem"}>{item.icon}</Box>
                  {toggled ? null : <Text>{item.label}</Text>}
                </HStack>
                {item.rightIcon ? (
                  <Box
                    borderRadius=".3rem"
                    _hover={{ color: "#E84A34" }}
                    onClick={() => handleClick(item.link)}
                    fontSize="1.3rem"
                  >
                    {item.rightIcon}
                  </Box>
                ) : null}
              </HStack>
            </Link>
          );
        })}
      </VStack>
      <AddNewsModal isOpen={isAddNewsOpen} onClose={onAddNewsClose} />
      <AddEventsModal isOpen={isAddEventsOpen} onClose={onAddEventsClose} />
      <AddProjectsModal
        isOpen={isAddProjectsOpen}
        onClose={onAddProjectsClose}
      />
      <AddProjectsModal
        isOpen={isAddProjectsOpen}
        onClose={onAddProjectsClose}
      />
      <AddMemberModal isOpen={isAddMemberOpen} onClose={onAddMemberClose} />
    </Box>
  );
}

export default SideNavigation;
