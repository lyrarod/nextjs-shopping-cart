import { useEffect, useState } from "react";
import Head from "next/head";
import { CreateForm } from "../components/CreateForm";
import styled from "styled-components";

const fakeItems = [
  { id: 1, product: "1kg Arroz", qty: 1, price: 0 },
  { id: 2, product: "1kg Feijão", qty: 1, price: 0 },
  { id: 3, product: "Batata Pré Frita", qty: 1, price: 0 },
];

export default function Home() {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemsLocalStorage = () => {
      const data = localStorage.getItem("Items");
      return data ? JSON.parse(data) : fakeItems;
    };

    const data = getItemsLocalStorage();
    setItems(data);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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

  const amount = () => {
    let total = items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
    return total.toFixed(2);
  };

  return (
    <Container>
      <Head>
        <title>Lista de Produtos</title>
      </Head>

      <CreateForm fnCreateItem={createItem} loading={loading} />
      {loading && (
        <p style={{ padding: "0 1rem" }}>
          <em>Aguarde...</em>
        </p>
      )}

      {!loading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Produtos no carrinho: {items?.length}
          </p>

          <div style={{}}>
            <div>R$ {amount()}</div>
          </div>
        </div>
      )}

      <WrapperItems>
        {!loading &&
          items.length > 0 &&
          items.map((item, i) => {
            const { id, product, qty, price } = item;

            return (
              <div key={id} className="product">
                <div
                  style={{
                    overflowX: "auto",
                  }}
                >
                  {product}
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      // background: "tomato",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div>R$</div>
                      <div>
                        <button
                          onClick={() => {
                            setItems([
                              ...items.map((item) => {
                                if (item.id === id && item.price > 0) {
                                  return {
                                    ...item,
                                    price: +(item.price - 0.01).toFixed(2),
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
                          value={price}
                          onChange={(e) => handleOnChangePrice(e, id)}
                          type={"number"}
                          min="0"
                          max="999"
                        />

                        <button
                          onClick={() => {
                            setItems([
                              ...items.map((item) => {
                                if (item.id === id && item.price < 999) {
                                  return {
                                    ...item,
                                    price: +(item.price + 0.01).toFixed(2),
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

                  <div
                    style={{
                      width: "50%",
                      // background: "cyan",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div>Qtd</div>
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
                        />

                        <button
                          onClick={() => {
                            setItems([
                              ...items.map((item) => {
                                if (item.id === id && item.qty < 999) {
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
      </WrapperItems>

      {!loading && items?.length < 1 && <p>Nenhum item...</p>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const WrapperItems = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  margin-top: 8px;

  .product {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 8px 16px;

    button {
      padding: 0 8px;
    }

    input {
      text-align: center;
    }
  }

  .product:nth-child(odd) {
    background: #0001;
  }
  .product:nth-child(even) {
    background: #fff;
  }
`;
