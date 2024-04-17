import { Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface LinksProps {
  header: string;
  links: string[];
  path: string[];
}

function Links(props: LinksProps) {
  const { header, links, path } = props;
  return (
    <VStack align="start">
      <Text
        fontFamily="inter"
        fontWeight="semibold"
        color="#8C85FF"
        fontSize={{ base: ".9rem", md: "1.1rem" }}
        marginBottom="1rem"
      >
        {header}
      </Text>
      {links.map((link, index) => {
        return header !== "Government Links" ? (
          <Link key={link} to={path[index]}>
            <Text
              color="#C5C1FF"
              fontFamily="inter"
              fontWeight="semibold"
              fontSize={{ base: ".8rem", md: ".9rem" }}
            >
              {link}
            </Text>
          </Link>
        ) : (
          <Text
            as="a"
            target="_blank"
            href={path[index]}
            color="#C5C1FF"
            fontFamily="inter"
            fontWeight="semibold"
            fontSize={{ base: ".8rem", md: ".9rem" }}
          >
            {link}
          </Text>
        );
      })}
    </VStack>
  );
}

export default Links;
