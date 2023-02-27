import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { PlaneTabIcon } from '@common/icons';
import { SearchTabPanel } from '@common/SearchTabPanel';
import { ISearchPageTab } from '@interfaces/search.interfaces';

const tabs: ISearchPageTab[] = [
  { label: 'flights', icon: 'PlaneTabIcon' },
  { label: 'check-in' },
  { label: 'manage booking' },
];

const SearchPageTabs: React.FC = () => {
  return (
    <Tabs
      border="none"
      bg="transparent"
      variant="unstyled"
      m="8.4375rem auto 0"
      width="64.625rem"
      height="fit-content"
    >
      <TabList border="none" display="flex" gap="0.625rem">
        {tabs.map((tab) => (
          <Tab
            p="0.375rem 1.3125rem"
            key={tab.label}
            minW="9.5625rem"
            bgColor="white"
            border="none"
            borderRadius="0.375rem 0.375rem 0rem 0rem"
            fontWeight="600"
            justifyContent="flex-start"
            _selected={{
              color: '#0A66C2',
              outline: 'none',
              fontWeight: '700',
              fill: '#0A66C2',
            }}
          >
            <Text casing={'uppercase'}>{tab.label}</Text>
            {tab.icon && (
              <Box w="1.625rem" h="1.625rem" ml="0.3125rem" mb="0.2rem">
                <PlaneTabIcon />
              </Box>
            )}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        <SearchTabPanel />
        <TabPanel p="0">
          <Box
            width="64.625rem"
            height="16.875rem"
            backgroundColor="#FFFFFF"
            blur="0.125rem"
            borderRadius="0rem 0.375rem 0.375rem 0.375rem"
            border={'solid 0.0625rem white'}
            data-testid={`${tabs[1].label}-panel`}
          ></Box>
        </TabPanel>
        <TabPanel p="0">
          <Box
            width="64.625rem"
            height="16.875rem"
            backgroundColor="#FFFFFF"
            blur="0.125rem"
            borderRadius="0rem 0.375rem 0.375rem 0.375rem"
            border={'solid 0.0625rem white'}
            data-testid={`${tabs[2].label}-panel`}
          ></Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SearchPageTabs;
