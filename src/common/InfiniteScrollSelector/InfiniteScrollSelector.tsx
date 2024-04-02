import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Spinner } from '@chakra-ui/react';

import { IScrollComponent } from './infiniteScrollSelector.interface';

const InfiniteScrollSelector = ({
  targetList,
  onClick,
  next,
  hasMore,
  loader = null,
  isLoading,
}: IScrollComponent) => {
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
        backgroundColor: 'white',
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
              targetList?.map((el) => {
                const { name, code } = el;
                return (
                  <Box
                    // TODO: сменить code на name когда будут приходить данные с сервера
                    onMouseDown={() => onClick((code && code) || '')}
                    key={code}
                    style={{
                      padding: '4px 16px',
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                      borderBottom: '1px solid lightgray',
                      textAlign: 'left',
                    }}
                    _hover={{ bg: '#ebedf0' }}
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
