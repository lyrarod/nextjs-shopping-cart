import { useRef, useState } from "react";
import styled from "styled-components";

export const CreateForm = ({ loading, fnCreateItem }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) {
      setValue("");
      inputRef.current.focus();
      return;
    }

    const newItem = {
      id: Date.now(),
      product: value.trim(),
      qty: 1,
      price: 0,
    };

    fnCreateItem(newItem);
    setValue("");
    inputRef.current.focus();

    // console.log("Create Item:", newItem);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
        disabled={loading}
        placeholder="Nome do produto..."
        maxLength={75}
      />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 100%;

  input {
    width: 100%;
    border: 0;
    background-color: #fff;
    border-radius: 4px;
    padding: 4px 6px;
    color: #050f0f;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 500;

    &::placeholder {
      color: #0005;
      font-style: oblique;
      font-size: 14px;
      font-weight: normal;
    }
  }
`;
