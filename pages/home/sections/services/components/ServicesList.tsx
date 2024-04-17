import { Wrap } from "@chakra-ui/react";
import DocumentServiceCard from "./DocumentServiceCard";
import AppointmentServiceCard from "./AppointmentServiceCard";
import ComplaintServiceCard from "./ComplaintServiceCard";
import EducationalAssistanceServiceCard from "./EducationalAssistanceServiceCard";

function ServicesList() {
  return (
    <Wrap w="100%" p="1rem" justify="center" align="center" spacing="3rem">
      <ComplaintServiceCard />
      <EducationalAssistanceServiceCard />
      <DocumentServiceCard />
      <AppointmentServiceCard />
    </Wrap>
  );
}

export default ServicesList;
