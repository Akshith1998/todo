import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import TodoList from "./components/TodoList";

const Container = styled.div``;

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <Protected>
                <TodoList />
              </Protected>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
