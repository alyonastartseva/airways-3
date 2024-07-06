import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Spinner } from '@chakra-ui/react';

import { useTheme } from '@context/:ThemeProvider';

import { IScrollComponent } from './infiniteScrollSelector.interface';

const InfiniteScrollSelector = ({
  targetList,
  onClick,
  next,
  hasMore,
  loader = null,
  isLoading,
}: IScrollComponent) => {
  const { theme } = useTheme();

  const backgroundColor = theme === 'dark' ? 'gray.800' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';
  const hoverBackgroundColor = theme === 'dark' ? 'gray.600' : '#ebedf0';
  return (
    <div
      id="scrollable"
      style={{
        minHeight: 30,
        width: '100%',
        position: 'absolute',
        maxHeight: 150,
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 9999,
        backgroundColor: backgroundColor,
        border: '1px solid #3182ce',
        outline: '1px solid #3182ce',
        borderTop: 'none',
        borderBottomRightRadius: '0.375rem',
        borderBottomLeftRadius: '0.375rem',
      }}
    >
      <InfiniteScroll
        dataLength={targetList.length}
        next={next}
        hasMore={hasMore}
        loader={loader}
        scrollableTarget="scrollable"
      >
        <div className="container">
          <div className="row">
            {targetList &&
              targetList.map((el, index) => {
                const { name, code } = el;
                return (
                  <Box
                    key={index}
                    onMouseDown={() => onClick(code || '')}
                    style={{
                      padding: '4px 16px',
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                      borderBottom: '1px solid lightgray',
                      textAlign: 'left',
                      color: textColor,
                    }}
                    _hover={{ bg: hoverBackgroundColor }}
                  >
                    {`${name} - ${code}`}
                  </Box>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
      {isLoading && (
        <Box style={{ width: '15px', height: '30px', margin: '0 auto' }}>
          <Spinner
            style={{ width: 15, height: 15, marginTop: 8 }}
            size={'sm'}
            color="lightgray"
          />
        </Box>
      )}
    </div>
  );
};

export default InfiniteScrollSelector;
