import { useState, useEffect } from "react";
import { Users } from "../../../components/Admin/Users";
import Person from "@/Interfaces/Person";
import flightsService from "@/services/flightsService";

function UsersPage() {
  const [data, setUsersData] = useState<Person[]>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    flightsService.getUsers().then((users) => setUsersData(users));
  }, []);

  const setPaginationData = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < data.length / pageSize) {
      setPagination((prev) => ({
        ...prev,
        pageIndex,
      }));
    }
  };

  return (
      <Users
        data={data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)}
        setPaginationData={setPaginationData}
        total={data.length}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
  );
}

export default UsersPage;
