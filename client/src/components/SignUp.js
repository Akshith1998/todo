import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  background: #2d862d;
  height: 40vh;
  padding: 30vh 0;
`;

const Wrapper = styled.div`
  width: 350px;
  height: 350px;
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

const ConfirmPassword = styled.input`
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

const SignUp = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [userexist, setUserexist] = useState(false);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://todolist-10x.herokuapp.com/user/signup", {
        username: data.username,
        password: data.password,
        confirmpassword: data.confirmpassword,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === "User already exists.") {
          setUserexist(true);
        } else {
          setValidate(true);
        }
      });
  };

  return (
    <Container>
      <Wrapper>
        <Heading>Register</Heading>
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
          <ConfirmPassword
            type="password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setData({ ...data, confirmpassword: e.target.value })
            }
          />
          <Button onClick={(e) => handlesubmit(e)}>Sign Up</Button>
        </Form>
        {validate && (
          <Validate>
            <Error>Passwords doesn't match</Error>
          </Validate>
        )}
        {userexist && (
          <Validate>
            <Error>User Exists</Error>
          </Validate>
        )}
      </Wrapper>
    </Container>
  );
};

export default SignUp;
