import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12vw;
  background: #00e600;
  height: 85vh;
`;

const Heading = styled.h1``;

const History = styled.h2``;

const Logout = styled.h2`
  margin-top: 50vh;
  cursor: pointer;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.setItem("authorization", "");
    navigate("/");
  };
  return (
    <Container>
      <Heading>To do list</Heading>
      <History>History</History>
      <Logout onClick={handlelogout}>Logout</Logout>
    </Container>
  );
};

export default Sidebar;
