import { Button, ButtonGroup, Flex } from '@chakra-ui/react';

import { IPagination } from '@interfaces/pagination.interfaces';
import { getVisiblePages } from '@utils/pagination.utils';

const Pagination = <Data,>(props: IPagination<Data>) => {
  const { data, setPaginationData, pageIndex, pageSize } = props;

  const handleToFirstPage = (currentPage: number): void => {
    if (currentPage !== 0) {
      setPaginationData(0);
    }
  };

  const handleToLastPage = (currentPage: number, pageCount: number): void => {
    if (pageCount !== currentPage) {
      setPaginationData(pageCount);
    }
  };

  const handleToPressedPage = (currentPage: number, page: number): void => {
    if (page - 1 !== currentPage) {
      setPaginationData(page - 1);
    }
  };

  return data ? (
    <Flex my={8}>
      <Button
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
        me={5}
        className="border rounded p-1"
        onClick={() => setPaginationData(pageIndex - 1)}
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
        {getVisiblePages(pageIndex, Math.ceil(data?.length / pageSize)).map(
          (page, index) => (
            <Button
              key={`page-${Date.now()}}+${index}`}
              onClick={() => {
                handleToPressedPage(pageIndex, page);
              }}
              borderRadius="0.125rem"
              border="0.0625rem solid #DEDEDE"
              bgColor={
                page === pageIndex + 1 ? '#398AEA' : 'rgba(217, 217, 217, 0.15)'
              }
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
          )
        )}
      </ButtonGroup>
      <Button
        ms={5}
        className="border rounded p-1"
        onClick={() => setPaginationData(pageIndex + 1)}
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
        ms={2}
        className="border rounded p-1"
        onClick={() => {
          const pageCount = Math.ceil(data.length / pageSize - 1);
          handleToLastPage(pageIndex, pageCount);
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
        {'>>'}
      </Button>
    </Flex>
  ) : null;
};

export default Pagination;
