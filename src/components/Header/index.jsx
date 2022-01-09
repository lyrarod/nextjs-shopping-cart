import { CreateForm } from "../CreateForm";

export const Header = ({ items, loading, fnCreateItem }) => {
  const amount = () => {
    let total = items.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
    return total.toFixed(2);
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "16px",
        background: "linear-gradient(to right,#5CADAD,#297A7A )",
        boxShadow: "0 2px 2px #0003",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        zIndex: "999",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          color: "#fff",
        }}
      >
        <h2 style={{}}>R$ {amount()}</h2>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "16px", fontWeight: "700" }}>
            {items?.length}
          </span>
          <h2>🛒</h2>
        </div>
      </div>

      <CreateForm fnCreateItem={fnCreateItem} loading={loading} />
    </div>
  );
};
