import { HStack } from "@chakra-ui/react";
import Links from "./Links";

function FooterLinks() {
  return (
    <HStack
      justify={{ base: "center", lg: "start" }}
      align="start"
      spacing="5rem"
    >
      <Links header="About" links={["History"]} path={["about"]} />
      <Links
        header="Services"
        links={["Get Documents", "Schedule Appointments", "File Complaints"]}
        path={[
          "services/get_documents",
          "services/schedule_appointments",
          "services/file_complaints",
        ]}
      />
      <Links
        header="Government Links"
        links={[
          "Office of the President",
          "Office of the Vice President",
          "Senate of the Philipines",
          "House of Representatives",
          "Supreme Court",
          "Court of Appeals",
          "Sandigang Bayan",
        ]}
        path={[
          "http://president.gov.ph/",
          "http://ovp.gov.ph/",
          "http://www.senate.gov.ph/",
          "htthttp://www.congress.gov.ph/",
          "http://sc.judiciary.gov.ph/",
          "http://ca.judiciary.gov.ph/",
          "http://sb.judiciary.gov.ph/",
        ]}
      />
    </HStack>
  );
}

export default FooterLinks;
