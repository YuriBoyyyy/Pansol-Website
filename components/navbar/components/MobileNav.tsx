import { Box, useDisclosure } from "@chakra-ui/react";
import { BiMenuAltRight } from "react-icons/bi";
import {
  BsCalendar2EventFill,
  BsFillChatSquareTextFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";
import { HiHome, HiNewspaper } from "react-icons/hi";
import MobileNavMenu from "./MobileNavMenu";
import Logo from "../../../assets/Logo(variant).svg";

function MobileNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        color="palette.primary"
        fontSize="2rem"
        onClick={onOpen}
        _hover={{ color: "palette.primary_hover" }}
      >
        <BiMenuAltRight />
      </Box>
      <MobileNavMenu
        isOpen={isOpen}
        onClose={onClose}
        navItems={{
          navLinks: ["Home", "About", "Forum", "Events", "News"],
          navLogo: [
            <HiHome key="Home" />,
            <BsFillInfoCircleFill key="About" />,
            <BsFillChatSquareTextFill key="Forum" />,
            <BsCalendar2EventFill key="Events" />,
            <HiNewspaper key="News" />,
          ],
          logo: Logo,
        }}
      />
    </>
  );
}

export default MobileNav;
