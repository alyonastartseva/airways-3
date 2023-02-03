import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';

import arrowLeftIcon from '@assets/images/svg/ArrowLeft.svg';
import { IArticle } from '@interfaces/search.interfaces';

const ArticleCard: React.FC<IArticle> = (props: IArticle) => {
  const { title, header, body, image } = props;
  return (
    <Card
      borderRadius="0.25rem"
      boxShadow="0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);"
      bgColor="#FFF"
      w="16.875rem"
      h="10rem"
    >
      <CardHeader p="0" pl="0.75rem">
        <Flex justifyContent="space-between">
          <Heading>
            <Text
              textTransform="uppercase"
              fontWeight="600"
              mt="0.75rem"
              mb="0.25rem"
              fontSize="0.8125rem"
            >
              {title}
            </Text>
          </Heading>
          <Image src={arrowLeftIcon} mr="0.5625rem" mt="0.25rem" />
        </Flex>
        <Box mt="0.125rem" h="0.0625rem" w="15.375rem" bgColor="#D9D9D9" />
      </CardHeader>
      <CardBody p="0.75rem">
        <Flex>
          <Box mt="0.125rem">
            <Text
              display="block"
              fontSize="0.625rem"
              fontWeight="600"
              color="#0A66C2"
            >
              {header}
            </Text>
            <Text
              whiteSpace="pre-line"
              lineHeight="0.875rem"
              mt="0.9375rem"
              fontSize="0.625rem"
              fontWeight="400"
              color="#868484"
            >
              {body}
            </Text>
          </Box>
          <Image
            w="7rem"
            h="5.5rem"
            mb="1.3125rem"
            src={image.src}
            alt={image.alt}
          />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ArticleCard;
