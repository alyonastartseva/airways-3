import { Flex } from '@chakra-ui/react';

import { Pagination } from '@components/Pagination';
import { ButtonGroupAdmin } from '@common/ButtonGroupAdmin';
import { IFooterTable } from '@interfaces/table.interfaces';

const FooterTable = <Data,>({
  data,
  pageIndex,
  pageSize,
  totalPages,
  setPaginationData,
  editableRowIndex,
  cancelEditing,
  patchRow,
}: IFooterTable<Data>) => (
  <Flex justify="space-between" alignItems="center">
    <Pagination
      data={data}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalPages={totalPages}
      setPaginationData={setPaginationData}
    />
    {data && editableRowIndex !== null && (
      <ButtonGroupAdmin cancelEditing={cancelEditing} patchRow={patchRow} />
    )}
  </Flex>
);

export default FooterTable;
