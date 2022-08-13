import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import axios from "axios";
import Tablecomponent from "./Tablecomponent";

const Container = styled.div``;

const Header = styled.div`
  height: 12vh;
  border: 5px solid #00e600;
`;

const Name = styled.h2`
  float: right;
`;

const Wrapper = styled.div`
  display: flex;
`;

const AddActivity = styled.input`
  position: absolute;
  left: 1000px;
  border: 5px solid #00e600;
  padding: 10px;
  cursor: pointer;
`;

const TodoList = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const authToken = localStorage.getItem("authorization");

  useEffect(() => {
    axios
      .get("https://todolist-10x.herokuapp.com/todolist", {
        headers: { authorization: authToken },
      })
      .then((data) => {
        console.log(data.data[0]);
        setList(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleActivity = () => {
    axios
      .post(
        "https://todolist-10x.herokuapp.com/todolist",
        {
          headers: { authorization: authToken },
        },
        {
          todolist: {
            activity: input,
            status: "Pending",
            time: "",
            action: "Start",
          },
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Header>
        <Name>{list.username}</Name>
      </Header>
      <Wrapper>
        <Sidebar />
        <AddActivity
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onMouseEnter={handleActivity}
          placeholder="Add new activity"
        />
        <Tablecomponent list={list} />
      </Wrapper>
    </Container>
  );
};

export default TodoList;
