import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background: #2d862d;
  height: 40vh;
  padding: 30vh 0;
`;

const Wrapper = styled.div`
  width: 350px;
  height: 370px;
  margin: 0 auto;
  border: 1px solid;
  padding: 10px;
  background: #adebeb;
  border: none;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 28px 5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 28px 5px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 28px 5px rgba(0, 0, 0, 0.75);
`;

const Heading = styled.h1`
  text-align: center;
  font-weight: 500;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserName = styled.input`
  width: 200px;
  height: 25px;
  margin-bottom: 20px;
  padding: 5px;
  background: #00cccc;
  border: 1px solid;
  text-align: center;
  font-size: 17px;
  &::placeholder {
    font-weight: 600;
    color: #800040;
  }
`;

const Password = styled.input`
  width: 200px;
  height: 25px;
  margin-bottom: 20px;
  padding: 5px;
  background: #00cccc;
  border: 1px solid;
  text-align: center;
  font-size: 17px;
  &::placeholder {
    font-weight: 600;
    color: #800040;
  }
`;

const Button = styled.button`
  width: 215px;
  height: 35px;
  padding: 7px;
  cursor: pointer;
  margin-bottom: 20px;
  background: #3366ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
`;

const Validate = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const Error = styled.h4`
  margin: 20px 0;
  color: #006600;
  font-weight: 500;
  font-size: 20px;
`;

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  const handlelogin = (e) => {
    e.preventDefault();
    axios
      .post("https://todolist-10x.herokuapp.com/user/login", {
        username: data.username,
        password: data.password,
      })
      .then((loginData) => {
        localStorage.setItem("authorization", loginData.data.token);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setCheck(true);
      });
  };

  const handlenavigate = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <Wrapper>
        <Heading>Member Login</Heading>
        <Form>
          <UserName
            type="text"
            placeholder="Username"
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <Password
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button onClick={(e) => handlelogin(e)}>LOGIN</Button>
          <Button onClick={handlenavigate}>Sign Up</Button>
        </Form>
        {check && (
          <Validate>
            <Error>Username and Password doesn't match</Error>
          </Validate>
        )}
      </Wrapper>
    </Container>
  );
};

export default Login;
