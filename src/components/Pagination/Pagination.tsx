import { useCallback } from 'react';
import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';

import { IPagination } from '@interfaces/pagination.interfaces';
import { getVisiblePages } from '@utils/pagination.utils';

const Pagination = <Data,>(props: IPagination<Data>) => {
  const { data, setPaginationData, pageIndex, pageSize, totalPages = 1 } = props;

  const setPagination = useCallback(
    (pageNumber: number) => {
      if (data?.length && pageNumber >= 0) {
        setPaginationData(pageNumber);
      }
    }, [data?.length, setPaginationData]);

  const handleToFirstPage = (currentPage: number): void => {
    if (currentPage !== 0) {
      setPagination(0);
    }
  };

  const handleToLastPage = (currentPage: number, pageCount: number): void => {
    if (pageCount !== currentPage) {
      setPagination(pageCount);
    }
  };

  const handleToPressedPage = (currentPage: number, page: number): void => {
    if (page - 1 !== currentPage) {
      setPagination(page - 1);
    }
  };

  return data && (totalPages>1) ? (
    <Flex my={8}>
      <Button
        display={pageIndex == 0 ? 'none' : 'block'}
        me={2}
        onClick={() => {
          handleToFirstPage(pageIndex);
        }}
        borderRadius="0.125rem"
        border="0.0625rem solid #DEDEDE"
        bgColor="rgba(217, 217, 217, 0.15)"
        color="#393939"
        _hover={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
        _active={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
      >
        {'<<'}
      </Button>
      <Button
        display={pageIndex == 0 ? 'none' : 'block'}
        me={5}
        className="border rounded p-1"
        onClick={() => setPagination(pageIndex - 1)}
        borderRadius="0.125rem"
        border="0.0625rem solid #DEDEDE"
        bgColor="rgba(217, 217, 217, 0.15)"
        color="#393939"
        _hover={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
        _active={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
      >
        {'<'}
      </Button>
      <ButtonGroup spacing={2}>
        {getVisiblePages(pageIndex, totalPages).map((page, index) => (
          <Button
            key={`page-${Date.now()}}+${index}`}
            onClick={() => handleToPressedPage(pageIndex, page)}
            borderRadius="0.125rem"
            border="0.0625rem solid #DEDEDE"
            bgColor={page === pageIndex + 1 ? '#398AEA' : 'rgba(217, 217, 217, 0.15)'}
            color={page === pageIndex + 1 ? '#FFFFFF' : '#393939'}
            _hover={{
              backgroundColor: '#398AEA',
              borderColor: '#398AEA',
              color: '#ffffff',
            }}
            _active={{
              backgroundColor: '#398AEA',
              borderColor: '#398AEA',
              color: '#ffffff',
            }}
          >
            {page}
          </Button>
        ))}
        <Box 
          pe={2}
          ps={2}
          pt={2}
          display={ totalPages > 5 && pageIndex < totalPages - 2 ? 'block':'none'}>
            ...
        </Box>
        <Button
        display={totalPages > 5 && pageIndex < totalPages - 2 ? 'block' : 'none'}
        className="border rounded p-1"
        onClick={() => setPagination(totalPages - 1)}
        borderRadius="0.125rem"
        border="0.0625rem solid #DEDEDE"
        bgColor="rgba(217, 217, 217, 0.15)"
        color="#393939"
        _hover={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
        _active={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
      >
        {totalPages}
      </Button>
      </ButtonGroup>
      <Button
        display={pageIndex + 1 == totalPages ? 'none' : 'block'}
        ms={5}
        className="border rounded p-1"
        onClick={() => setPagination(pageIndex + 1)}
        borderRadius="0.125rem"
        border="0.0625rem solid #DEDEDE"
        bgColor="rgba(217, 217, 217, 0.15)"
        color="#393939"
        _hover={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
        _active={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
      >
        {'>'}
      </Button>
      <Button
        display={pageIndex + 1 == totalPages ? 'none' : 'block'}
        ms={2}
        className="border rounded p-1"
        onClick={() => setPagination(totalPages-1)}
        borderRadius="0.125rem"
        border="0.0625rem solid #DEDEDE"
        bgColor="rgba(217, 217, 217, 0.15)"
        color="#393939"
        _hover={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
        _active={{
          backgroundColor: '#398AEA',
          borderColor: '#398AEA',
          color: '#ffffff',
        }}
      >
        {'>>'}
      </Button>
    </Flex>
  ) : null;
};

export default Pagination;
