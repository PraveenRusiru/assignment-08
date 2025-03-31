import { Database } from "../DB/Database.js";
let items = new Database().Items;
export class ItemModel {
  SaveItem(ItemDto) {
    items.push(ItemDto);
  }
  CheckItem(id) {
    return items.some((item) => item.id === id);
  }
  UpdateItem(ItemDto) {
    let item = items.find((i) => i.id === ItemDto.id);
    if (item) {
      Object.assign(item, ItemDto);
      alert("Updated Item:", item);
    } else {
      alert("Item not found!");
    }
  }
  DeleteItem(id) {
    items = items.filter((item) => item.id !== id);
    alert("Deleted Item");
  }
  GetAll() {
    return items;
  }
    getItemById(id) {
        return items.find(item => item.id === id);
  }
}