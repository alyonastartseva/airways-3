import { Box, Flex, Link, Text } from '@chakra-ui/react';

import {
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
  FacebookIcon,
} from '@common/icons/social';
import aSImage from '@assets/images/articles/ASImage.webp';
import bestOffersImage from '@assets/images/articles/BestOffersImage.webp';
import discoverImage from '@assets/images/articles/discoverImage.webp';
import holidayImage from '@assets/images/articles/holidayImage.webp';
import { SearchPageTabs } from '@common/SearchPageTabs';
import background from '@images/search-page-bg.webp';
import { IArticle } from '@interfaces/search.interfaces';
import { ArticleCard } from '@common/ArticleCard';
import { CovidCard } from '@common/CovidCard';

const articles: IArticle[] = [
  {
    title: 'Discover',
    header: 'Explore the world',
    body: `We fly over 200 destinations around the world.
 Explore all our destinations and new routes.`,
    image: { src: discoverImage, alt: 'discoverImage' },
  },
  {
    title: 'Holiday destinations',
    header: 'Get inspired',
    body: `Looking for summer destinations, city gate always or hidden gems?
     Discover best locations across the globe.`,
    image: { src: holidayImage, alt: 'holidayImage' },
  },
  {
    title: 'Our best offers',
    header: 'Surprise yourself',
    body: `Benefit from our best deals and fly to your favorite destinations.
    Or maybe explore a new one? `,
    image: { src: bestOffersImage, alt: 'bestOffersImage' },
  },
  {
    title: 'Additional services',
    header: 'Enjoy extra comfort',
    body: 'Explore our additional services including seat selection, extra baggage, add-on in-flight menus.',
    image: { src: aSImage, alt: 'aSImage' },
  },
];

const articleCards = articles.map((article) => (
  <ArticleCard key={article.title} {...article} />
));
const Search: React.FC = () => {
  return (
    <Box position="relative" minHeight="52.9375rem">
      <Box
        backgroundImage={background}
        backgroundRepeat="no-repeat"
        width="79rem"
        margin="0 auto"
        borderTop="0.0625rem solid"
      >
        <SearchPageTabs />
        <CovidCard />
        <Flex ml="3.5625rem" mt="0.5625rem" gap="1.625rem">
          {articleCards}
        </Flex>
        <Flex justifyContent="center" gap="0.3125rem" mt="1.5625rem">
          <Link href="#" target="_blank">
            <FacebookIcon />
          </Link>
          <Link href="#" target="_blank">
            <TwitterIcon />
          </Link>
          <Link href="#" target="_blank">
            <LinkedInIcon />
          </Link>
          <Link href="#" target="_blank">
            <InstagramIcon />
          </Link>
          <Link href="#" target="_blank">
            <YouTubeIcon />
          </Link>
        </Flex>
      </Box>
      <Box
        as="button"
        bgColor="#04396D"
        transform="rotate(-90deg)"
        borderRadius="0.375rem 0.375rem 0 0"
        top="13.125rem"
        right="-1.875rem"
        position="absolute"
      >
        <Text
          fontSize="0.75rem"
          p="0.25rem 0.9375rem"
          textTransform="uppercase"
          color="#FFF"
        >
          Feedback
        </Text>
      </Box>
    </Box>
  );
};

export default Search;
