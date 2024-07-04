import InfiniteScroll from 'react-infinite-scroll-component';
import { Card, Spin } from 'antd';

import { IScrollComponent } from './infiniteScrollSelector.interface';
import styles from './InfiniteScrollSelector.module.scss';

const InfiniteScrollSelector = ({
  targetList,
  onClick,
  next,
  hasMore,
  loader = null,
  isLoading,
}: IScrollComponent) => {
  return (
    <div id="scrollable" className={styles.scrollbar}>
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
                  <Card
                    className={styles.card}
                    // TODO: сменить code на name когда будут приходить данные с сервера
                    onMouseDown={() => onClick((code && code) || '')}
                    key={code}
                    hoverable
                    bodyStyle={{ padding: 0 }}
                  >
                    {`${name} - ${code}`}
                  </Card>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
      {isLoading && (
        <div style={{ width: '15px', height: '30px', margin: '0 auto' }}>
          <Spin
            style={{ width: 15, height: 15, marginTop: 8 }}
            size="small"
            tip="Loading..."
          />
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollSelector;
