import { Box, Button, Flex } from '@chakra-ui/react';

import { IPagination } from '@/interfaces/pagination.interfaces';
import { getVisiblePages } from '@utils/pagination.utils';

const Pagination = (props: IPagination) => {
  const { data, setPaginationData, pageIndex, pageSize } = props;
  return (
    <Flex my={8}>
      <Button
        mx={1}
        className="border rounded p-1"
        onClick={() => setPaginationData(0)}
      >
        {'<<'}
      </Button>
      <Button
        mx={1}
        className="border rounded p-1"
        onClick={() => setPaginationData(pageIndex - 1)}
      >
        {'<'}
      </Button>
      <Box display="inline-flex">
        {getVisiblePages(pageIndex, Math.ceil(data.length / pageSize)).map(
          (page, index) => (
            <Button
              mx={1}
              key={`page-${Date.now()}}+${index}`}
              onClick={() => setPaginationData(page - 1)}
            >
              {page}
            </Button>
          )
        )}
      </Box>
      <Button
        mx={1}
        className="border rounded p-1"
        onClick={() => setPaginationData(pageIndex + 1)}
      >
        {'>'}
      </Button>
      <Button
        mx={1}
        className="border rounded p-1"
        onClick={() => {
          setPaginationData(Math.ceil(data.length / pageSize - 1));
        }}
      >
        {'>>'}
      </Button>
    </Flex>
  );
};

export default Pagination;
