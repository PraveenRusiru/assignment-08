export class ItemDto {
  id;
  name;
  qty;
  price;
  constructor(id, name, qty, price) {
    this.id = id;
    this.name = name;
    this.qty = qty;
      this.price = price;
    
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
    getprice() {
        return this.price;
    }
    setprice(price) {
        this.price = price;
    }
    getQty() {
        return this.qty;
    }
    setQty(qty) {
        this.qty = qty;
    }
}