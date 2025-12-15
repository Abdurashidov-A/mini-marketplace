const { useState, useEffect } = React;

function CartItem({ item, onRemove, onChangeQuantity }) {
  return (
    <div className="cart-item">
      <span>{item.title}</span>
      <span>${item.price}</span>
      <div>
        <button onClick={() => onChangeQuantity(item.id, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onChangeQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

function CartList() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemove = (id) => setCart(cart.filter((item) => item.id !== id));
  const handleChangeQuantity = (id, newQty) => {
    if (newQty <= 0) return handleRemove(id);
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-list">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={handleRemove}
          onChangeQuantity={handleChangeQuantity}
        />
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("cart-root"));
root.render(<CartList />);
