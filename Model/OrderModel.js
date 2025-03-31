import { Database } from "../DB/Database.js";
let orders = new Database().Orders;
export class OrderModel { 
    SaveOrder(OrderDto) {
        orders.push(OrderDto);
    }
    CheckOrder(id) {
        return orders.some((order) => order.id === id);
    }
}