import { Flex } from '@chakra-ui/react';

import { Pagination } from '@components/Pagination';
import { ButtonGroupAdmin } from '@common/ButtonGroupAdmin';
import { IFooterTable } from '@common/FooterTable/footerTable.interfaces';

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
      data={data}
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
