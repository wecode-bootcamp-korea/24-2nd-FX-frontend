import React from "react";
import styled from "styled-components";

const LoginInput = props => {
  const { name, title, type, validation, inputAlert, setName } = props.data;
  return (
    <InputContainer>
      <PlaceHolder>{title}</PlaceHolder>
      <Input name={name} type={type} onChange={e => setName(e.target.value)} />
      {validation && <InputAlert>{inputAlert}</InputAlert>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: block;
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  padding: 0 20px;
  background-color: #333333;
  border-radius: 5px;
  text-align: left;

  &:hover {
    background-color: #444444;
    border-bottom: 3px solid orange;
  }
`;

const PlaceHolder = styled.span`
  color: #8c8c8c;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 20px;
  color: white;
  border: none;
  background-color: transparent;
`;

const InputAlert = styled.div`
  color: orange;
  font-weight: bold;
`;

export default LoginInput;
