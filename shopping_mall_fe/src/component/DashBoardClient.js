import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { Table } from "react-bootstrap";
function DashBoardClient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users")
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
        // console.log(res.data)
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) return <Loading />;
  if (users && users.length == 0)
    return <h2 className="py-2 text-center">No users yet</h2>;

  return (
    <>
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Client Id</th>
          <th>Client Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
         
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
//   return <></>;
}
export default DashBoardClient;
