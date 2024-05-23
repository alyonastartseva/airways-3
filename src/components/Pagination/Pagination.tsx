import { useCallback } from 'react';
import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';

import { ArrowRightIcon, ArrowLeftIcon } from '@common/icons';
import { getVisiblePages } from '@utils/pagination.utils';

import { IPagination } from './Pagination.interfaces';

const Pagination = <Data,>(props: IPagination<Data>) => {
  enum PaginationStyle {
    _borderRadius = '0.4rem',
    _textColor = '#0052BD',
    _bgColor = '#C2DCFF',
    _bgColorActive = '#398AEA',
  }

  const { data, setPaginationData, pageIndex, totalPages = 1 } = props;

  const setPagination = useCallback(
    (pageNumber: number) => {
      if (data?.length && pageNumber >= 0) {
        setPaginationData(pageNumber);
      }
    },
    [data?.length, setPaginationData]
  );

  const handleToPressedPage = (currentPage: number, page: number): void => {
    if (page - 1 !== currentPage) {
      setPagination(page - 1);
    }
  };

  return data && totalPages > 1 ? (
    <Flex my={8}>
      <Flex>
        <Button
          outline={'none'}
          display={pageIndex == 0 ? 'none' : 'block'}
          onClick={() => setPagination(pageIndex - 1)}
          fontWeight={400}
          variant="ghost"
          w="5"
          color={PaginationStyle._textColor}
          fontSize="1rem"
          // caution: при выставлении outline: 'none' и border: 'none' - верстка прыгает
          // здесь и ниже borderColor выставлен под цвет фона (белый)
          _hover={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
          _active={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
          _focus={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
        >
          {<ArrowLeftIcon color="#0052BD" />}
        </Button>
        <Button
          outline={'none'}
          display={pageIndex == 0 ? 'none' : 'block'}
          // ml={0}
          mr={5}
          pl={0}
          className="rounded p-1"
          onClick={() => setPagination(pageIndex - 1)}
          fontWeight={400}
          variant="ghost"
          color={PaginationStyle._textColor}
          fontSize="1rem"
          // caution: при выставлении outline: 'none' и border: 'none' - верстка прыгает
          // здесь и ниже borderColor выставлен под цвет фона (белый)
          _hover={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
          _active={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
          _focus={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
        >
          {' Предыдущая страница'}
        </Button>
      </Flex>
      <ButtonGroup spacing={1}>
        {getVisiblePages(pageIndex, totalPages).map((page, index) => (
          <Button
            key={`page-${Date.now()}}+${index}`}
            onClick={() => handleToPressedPage(pageIndex, page)}
            borderRadius={PaginationStyle._borderRadius}
            bgColor={
              page === pageIndex + 1
                ? PaginationStyle._bgColorActive
                : PaginationStyle._bgColor
            }
            color={
              page === pageIndex + 1 ? '#FFFFFF' : PaginationStyle._textColor
            }
            outline={'none'}
            w={10}
            h={39}
            _hover={{
              backgroundColor: PaginationStyle._bgColorActive,
              color: '#ffffff',
            }}
            _active={{
              backgroundColor: PaginationStyle._bgColorActive,
              color: '#ffffff',
              outline: 'none',
            }}
            _focus={{
              outline: 'none',
            }}
          >
            {page}
          </Button>
        ))}
        <Box
          pe={3}
          ps={3}
          pt={2}
          display={
            totalPages > 5 && pageIndex < totalPages - 2 ? 'block' : 'none'
          }
          color={PaginationStyle._textColor}
        >
          ...
        </Box>
        <Button
          display={
            totalPages > 5 && pageIndex < totalPages - 2 ? 'flex' : 'none'
          }
          className="rounded p-1"
          onClick={() => setPagination(totalPages - 1)}
          borderRadius={PaginationStyle._borderRadius}
          bgColor={PaginationStyle._bgColor}
          color={PaginationStyle._textColor}
          w={10}
          h={38}
          _hover={{
            backgroundColor: PaginationStyle._bgColorActive,
            color: '#ffffff',
            outline: 'none',
          }}
          _active={{
            backgroundColor: PaginationStyle._bgColorActive,
            color: '#ffffff',
            outline: 'none',
          }}
          _focus={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
        >
          {totalPages}
        </Button>
      </ButtonGroup>
      <Flex>
        <Button
          outline={'none'}
          display={pageIndex + 1 == totalPages ? 'none' : 'block'}
          ml={5}
          pr={1}
          className="rounded p-1"
          onClick={() => setPagination(pageIndex + 1)}
          fontWeight={400}
          variant="ghost"
          color={PaginationStyle._textColor}
          _hover={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
          _active={{
            outline: 'none',
            border: 'none',
          }}
          _focus={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
        >
          {'Следующая страница '}
        </Button>
        <Button
          outline={'none'}
          display={pageIndex + 1 == totalPages ? 'none' : 'block'}
          onClick={() => setPagination(pageIndex - 1)}
          variant="ghost"
          color={PaginationStyle._textColor}
          pl="0"
          // caution: при выставлении outline: 'none' и border: 'none' - верстка прыгает
          // здесь и ниже borderColor выставлен под цвет фона (белый)
          _hover={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
          _active={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
          _focus={{
            outline: 'none',
            borderColor: '#FFFFFF',
          }}
        >
          {<ArrowRightIcon color="#0052BD" />}
        </Button>
      </Flex>
    </Flex>
  ) : null;
};

export default Pagination;
