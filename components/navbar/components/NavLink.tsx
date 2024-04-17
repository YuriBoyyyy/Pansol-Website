/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AiFillProject,
  AiOutlineExclamationCircle,
  AiOutlineFolderView,
  AiOutlineProject,
} from "react-icons/ai";
import {
  BiBuildingHouse,
  BiChevronDown,
  BiGroup,
  BiNetworkChart,
} from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineGroups, MdOutlineHealthAndSafety } from "react-icons/md";
import { Link } from "react-router-dom";
import useApp from "../../../hooks/useApp";

interface NavLinkProps {
  nav: string;
  navLogo: JSX.Element;
}

function NavigationLink(props: NavLinkProps): JSX.Element {
  const { nav, navLogo } = props;
  const appContext = useApp();

  return nav === "Places" ? (
    <Menu>
      <MenuButton
        className="places"
        bg="transparent"
        fontFamily="inter"
        fontWeight="normal"
        fontSize={appContext?.scrolled ? ".9rem" : ".95rem"}
        color={
          appContext?.activeNav === nav ? "palette.accent" : "palette.primary"
        }
        _hover={{
          color: "palette.accent",
        }}
        _active={{}}
        p="0"
        as={Button}
        rightIcon={<BiChevronDown />}
      >
        Places
      </MenuButton>
      <MenuList fontFamily="inter">
        <MenuItem as={Link} to="establishments" icon={<BiBuildingHouse />}>
          Establishments
        </MenuItem>
        <MenuItem as={Link} to="spots" icon={<AiOutlineFolderView />}>
          Tourist Spots
        </MenuItem>
        <MenuItem
          as={Link}
          to="health-center"
          icon={<MdOutlineHealthAndSafety />}
        >
          Health Center
        </MenuItem>
      </MenuList>
    </Menu>
  ) : nav === "About" ? (
    <Menu>
      <MenuButton
        className="about"
        bg="transparent"
        fontFamily="inter"
        fontWeight="normal"
        fontSize={appContext?.scrolled ? ".9rem" : ".95rem"}
        color={
          appContext?.activeNav === nav ? "palette.accent" : "palette.primary"
        }
        _hover={{
          color: "palette.accent",
        }}
        _active={{}}
        p="0"
        as={Button}
        rightIcon={<BiChevronDown />}
      >
        About
      </MenuButton>
      <MenuList fontFamily="inter">
        <MenuItem as={Link} to="about" icon={<AiOutlineExclamationCircle />}>
          About Pansol
        </MenuItem>
        <MenuItem as={Link} to="officials" icon={<BsPeople />}>
          Officials
        </MenuItem>
        <MenuItem as={Link} to="samahan" icon={<MdOutlineGroups />}>
          Samahan
        </MenuItem>
        <MenuItem as={Link} to="other-officials" icon={<BiGroup />}>
          Other Officials
        </MenuItem>
      </MenuList>
    </Menu>
  ) : nav === "Projects" ? (
    <Menu>
      <MenuButton
        className="projects"
        bg="transparent"
        fontFamily="inter"
        fontWeight="normal"
        fontSize={appContext?.scrolled ? ".9rem" : ".95rem"}
        color={
          appContext?.activeNav === nav ? "palette.accent" : "palette.primary"
        }
        _hover={{
          color: "palette.accent",
        }}
        _active={{}}
        p="0"
        as={Button}
        rightIcon={<BiChevronDown />}
      >
        Projects
      </MenuButton>
      <MenuList fontFamily="inter">
        <MenuItem as={Link} to="barangay-projects" icon={<HiOutlineHome />}>
          Barangay Projects
        </MenuItem>
        <MenuItem as={Link} to="sk-projects" icon={<AiOutlineProject />}>
          SK Projects
        </MenuItem>
        <MenuItem as={Link} to="samahan-projects" icon={<BiNetworkChart />}>
          Samahan Projects
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Link
      className={nav.toLowerCase()}
      to={nav === "Home" ? "/" : nav.toLowerCase()}
    >
      <Text
        display="flex"
        justifyContent="center"
        alignItems="center"
        pos="relative"
        fontFamily="inter"
        fontWeight="normal"
        transition="all .3s ease"
        as={motion.div}
        fontSize={appContext?.scrolled ? ".9rem" : ".95rem"}
        color={
          appContext?.activeNav === nav ? "palette.accent" : "palette.primary"
        }
        _hover={{
          color: "palette.accent",
        }}
      >
        <HStack spacing="1">
          {appContext?.activeNav === nav ? (
            <Box
              as={motion.div}
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
            >
              {navLogo}
            </Box>
          ) : null}
          <Text>{nav}</Text>
        </HStack>
        {/* {appContext?.activeNav === nav && (
          <Box
            pos="absolute"
            bottom="-.6rem"
            w="1rem"
            h=".1rem"
            borderRadius="50%"
            bg="palette.accent"
            as={motion.div}
            layoutId="dot"
          />
        )} */}
      </Text>
    </Link>
  );
}

export default NavigationLink;
