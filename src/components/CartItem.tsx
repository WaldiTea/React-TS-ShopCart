import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../util/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const storeItem = storeItems.find((item) => item.id === id);
  if (storeItem == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={storeItem.imgUrl}
        alt="product"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {storeItem.name}{" "}
          {quantity >= 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              {quantity}x
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(storeItem.price)}
        </div>
      </div>
      <div>{formatCurrency(storeItem.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          removeFromCart(storeItem.id);
        }}
      >
        &times;
      </Button>
    </Stack>
  );
}
