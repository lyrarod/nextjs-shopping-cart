import { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { RiDeleteBin2Fill } from "react-icons/ri";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const getRndLoading = getRndInteger(1000, 2000);

  useEffect(() => {
    const getItemsLocalStorage = () => {
      const data = localStorage.getItem("Items");
      return data ? JSON.parse(data) : [];
    };

    const data = getItemsLocalStorage();
    setItems(data);

    const timer = setTimeout(() => {
      setLoading(false);
    }, getRndLoading);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(items));
  }, [items]);

  const createItem = (newItem) => {
    setItems([newItem, ...items]);
  };

  const handleOnChangeQtd = (e, id) => {
    setItems([
      ...items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            qty: +e.target.value,
          };
        }
        return {
          ...item,
        };
      }),
    ]);
  };

  const handleOnChangePrice = (e, id) => {
    setItems([
      ...items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            price: +e.target.value,
          };
        }
        return {
          ...item,
        };
      }),
    ]);
  };

  return (
    <Container>
      <Head>
        <title>Chappo Cart</title>
      </Head>

      {loading && <Loader />}

      {!loading && (
        <Header items={items} loading={loading} fnCreateItem={createItem} />
      )}

      <WrapperItems>
        {!loading &&
          items.length > 0 &&
          items.map((item, i) => {
            const { id, product, qty, price } = item;

            return (
              <div key={id} className="product">
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#297A7A",
                    }}
                  >
                    {i + 1}.
                  </span>
                  &nbsp;
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      letterSpacing: ".5px",
                      color: "#297A7A",
                      overflowX: "scroll",
                      marginBottom: "8px",
                    }}
                  >
                    {product}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <button
                      onClick={() => {
                        setItems([
                          ...items.map((item) => {
                            if (item.id === id && item.price > 0) {
                              return {
                                ...item,
                                price: +(+item.price - 0.01).toFixed(2),
                              };
                            }
                            return {
                              ...item,
                            };
                          }),
                        ]);
                      }}
                      children="-"
                    />

                    <input
                      value={price ? price : ""}
                      onChange={(e) => {
                        if (e.target.value.length > 6) return;
                        handleOnChangePrice(e, id);
                      }}
                      type={"number"}
                      min="0"
                      max="999"
                      placeholder="R$"
                      style={{
                        width: "60px",
                      }}
                    />

                    <button
                      onClick={() => {
                        setItems([
                          ...items.map((item) => {
                            if (item.id === id && item.price < 1000) {
                              return {
                                ...item,
                                price: +(+item.price + 0.01).toFixed(2),
                              };
                            }
                            return {
                              ...item,
                            };
                          }),
                        ]);
                      }}
                      children="+"
                    />
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        setItems([
                          ...items.map((item) => {
                            if (item.id === id && item.qty > 0) {
                              return {
                                ...item,
                                qty: --item.qty,
                              };
                            }
                            return {
                              ...item,
                            };
                          }),
                        ]);
                      }}
                      children="-"
                    />

                    <input
                      value={qty}
                      onChange={(e) => handleOnChangeQtd(e, id)}
                      type={"number"}
                      min="0"
                      max="999"
                      style={{
                        width: "60px",
                      }}
                    />

                    <button
                      onClick={() => {
                        setItems([
                          ...items.map((item) => {
                            if (item.id === id && item.qty < 1000) {
                              return {
                                ...item,
                                qty: ++item.qty,
                              };
                            }
                            return {
                              ...item,
                            };
                          }),
                        ]);
                      }}
                      children="+"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (
                        !confirm(
                          `Deseja remover o produto abaixo? ❌\n${product}`
                        )
                      )
                        return;

                      setItems([...items.filter((item) => item.id !== id)]);
                    }}
                    style={{
                      display: "grid",
                      placeItems: "center",
                      padding: "0",
                      color: "crimson",
                      border: "none",
                      background: "none",
                    }}
                    children={<RiDeleteBin2Fill size={"16px"} />}
                  />
                </div>
              </div>
            );
          })}

        {!loading && items?.length < 1 && (
          <p
            style={{
              // padding: "16px",
              color: "#5CADAD",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                textAlign: "center",
                fontSize: "24px",
              }}
            ></span>
            <br />
            Ops... sua lista está vazia ! <br />
            Adicione produtos à sua lista.
          </p>
        )}
      </WrapperItems>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const WrapperItems = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  margin-top: 96px;
  overflow-y: auto;

  .product {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 16px;
    position: relative;

    /* & + div {
      border-top: 1px solid #0001;
    } */

    &:nth-child(even) {
      background: #5551;
    }

    button {
      padding: 0 12px;
      border: 1px solid transparent;
      background: #5cadad;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      /* box-shadow: 1px 1px 1px #0003; */

      &:active {
        transform: scale(0.96);
      }
    }

    input[type="number"] {
      color: #5cadad;
      font-size: 14px;
      background: transparent;
      text-align: center;
      border: 1px solid #5cadad;
      -moz-appearance: textfield;

      &::placeholder {
        color: #0003;
        /* font-size: 14px; */
      }

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;
