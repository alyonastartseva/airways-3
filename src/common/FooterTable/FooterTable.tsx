import { Flex } from '@chakra-ui/react';

import { ButtonGroupAdmin, Pagination } from '@/common';

import { IFooterTable } from './footerTable.interfaces';

const FooterTable = <Data,>({
  data,
  pageIndex,
  totalPages,
  setPaginationData,
  editableRowIndex,
  cancelEditing,
  patchRow,
}: IFooterTable<Data>) => (
  <Flex justify="space-between" alignItems="center">
    <Pagination
      pageIndex={pageIndex}
      totalPages={totalPages}
      setPaginationData={setPaginationData}
    />
    {data && editableRowIndex !== null && (
      <ButtonGroupAdmin cancelEditing={cancelEditing} patchRow={patchRow} />
    )}
  </Flex>
);

export default FooterTable;
