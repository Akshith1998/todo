import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

const Container = styled.div``;

const Table = styled.table`
  height: 40vh;
  margin: 50px;
`;

const TableBody = styled.tbody``;

const TableHead = styled.thead``;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  background: lightblue;
  border: 1px solid black;
`;

const TableData = styled.td`
  border: 1px solid black;
  cursor: pointer;
`;

const Tablecomponent = ({ list }) => {
  const authToken = localStorage.getItem("authorization");
  const [task, setTask] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleAction = (e, item) => {
    if (!task) {
      setTask(true);
      e.target.innerHTML = "End";
    } else if (e.target.innerHTML === "End") {
      e.target.innerHTML = "Completed";
      axios
        .put("https://todolist-10x.herokuapp.com/todolist/update", {
          username: list.username,
          activity: item.activity,
          action: "Completed",
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Activity</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Time Taken(Hrs:Min:Sec)</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        {list.todolist &&
          list.todolist.map((item) => {
            return (
              <TableRow>
                <TableData>{item.activity}</TableData>
                <TableData>{item.status}</TableData>
                <TableData>{item.time}</TableData>
                <TableData onClick={(e) => handleAction(e, item)}>
                  {item.action}
                </TableData>
              </TableRow>
            );
          })}
      </Table>
    </Container>
  );
};

export default Tablecomponent;
