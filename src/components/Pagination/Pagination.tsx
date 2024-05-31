import { useCallback } from 'react';
import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';

import { ArrowRightIcon, ArrowLeftIcon } from '@/common/icons/';
import { IPagination } from '@components/Pagination/Pagination.interfaces';

import { getVisiblePages } from './Pagination.utils';

enum PaginationStyle {
  BORDER_RADIUS = '0.4rem',
  TEXT_COLOR = '#0052BD',
  BG_COLOR = '#C2DCFF',
  BG_COLOR_ACTIVE = '#398AEA',
}

const Pagination = <Data,>(props: IPagination<Data>) => {
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
          color={PaginationStyle.TEXT_COLOR}
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
          color={PaginationStyle.TEXT_COLOR}
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
            borderRadius={PaginationStyle.BORDER_RADIUS}
            bgColor={
              page === pageIndex + 1
                ? PaginationStyle.BG_COLOR_ACTIVE
                : PaginationStyle.BG_COLOR
            }
            color={
              page === pageIndex + 1 ? '#FFFFFF' : PaginationStyle.TEXT_COLOR
            }
            outline={'none'}
            w={10}
            h={39}
            _hover={{
              backgroundColor: PaginationStyle.BG_COLOR_ACTIVE,
              color: '#ffffff',
            }}
            _active={{
              backgroundColor: PaginationStyle.BG_COLOR_ACTIVE,
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
          color={PaginationStyle.TEXT_COLOR}
        >
          ...
        </Box>
        <Button
          display={
            totalPages > 5 && pageIndex < totalPages - 2 ? 'flex' : 'none'
          }
          className="rounded p-1"
          onClick={() => setPagination(totalPages - 1)}
          borderRadius={PaginationStyle.BORDER_RADIUS}
          bgColor={PaginationStyle.BG_COLOR}
          color={PaginationStyle.TEXT_COLOR}
          w={10}
          h={38}
          _hover={{
            backgroundColor: PaginationStyle.BG_COLOR_ACTIVE,
            color: '#ffffff',
            outline: 'none',
          }}
          _active={{
            backgroundColor: PaginationStyle.BG_COLOR_ACTIVE,
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
          color={PaginationStyle.TEXT_COLOR}
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
          color={PaginationStyle.TEXT_COLOR}
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
