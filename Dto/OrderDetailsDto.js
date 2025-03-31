export class OrderDetailDto {
  itemCode;
  order_id;
  qty;

  constructor(itemCode, order_id, qty) {
    this.itemCode = itemCode;
    this.order_id = order_id;
    this.qty = qty;
  }
}