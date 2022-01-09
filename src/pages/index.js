import { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";

const fakeItems = [
  { id: 1, product: "Headset com microfone (Logitech)", qty: 1, price: 169.0 },
  { id: 2, product: "Mouse silent (Logitech)", qty: 1, price: 49.9 },
  { id: 3, product: "Teclado USB (Microsoft)", qty: 1, price: 149.9 },
];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const getRndLoading = getRndInteger(1000, 2000);

  useEffect(() => {
    const getItemsLocalStorage = () => {
      const data = localStorage.getItem("Items");
      return data ? JSON.parse(data) : fakeItems;
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
        <title>Shopping Cart List</title>
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
                <button
                  onClick={() => {
                    setItems([...items.filter((item) => item.id !== id)]);
                  }}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "8px",
                    padding: "0",
                    border: "0",
                    boxShadow: "none",
                    color: "crimson",
                    fontSize: "10px",
                    fontWeight: "900",
                    background: "none",
                  }}
                  children="x"
                />

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    color: "#050F0F",
                    textAlign: "center",
                    overflowX: "scroll",
                  }}
                >
                  {product}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
                        onChange={(e) => handleOnChangePrice(e, id)}
                        type={"number"}
                        min="0"
                        max="999"
                        placeholder="R$"
                        style={{
                          width: "70px",
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
                  </div>

                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{}}>
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
                            width: "40px",
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
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {!loading && items?.length < 1 && (
          <p style={{ padding: "16px" }}>Adicione produtos à sua lista. 🙂</p>
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
  margin-top: 100px;
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
      font-weight: 500;
      font-size: 16px;
      box-shadow: 1px 1px 1px #0003;

      &:active {
        transform: scale(0.96);
      }
    }

    input[type="number"] {
      color: #050f0f;
      font-size: 16px;
      background: transparent;
      text-align: center;
      border: 1px solid #5cadad;
      -moz-appearance: textfield;

      &::placeholder {
        color: #0003;
        font-size: 14px;
      }

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;
