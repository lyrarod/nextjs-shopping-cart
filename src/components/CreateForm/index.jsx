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
      />

      <button
        type={"submit"}
        children="Add"
        disabled={loading}
        style={{ padding: "0 16px" }}
      />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  margin: 1rem;
`;
