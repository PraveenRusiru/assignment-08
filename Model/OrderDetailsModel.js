import { Database } from "../DB/Database.js";
let orderDetails = new Database().OrderDetails;
export class OrderDetailsModel{
    SaveOrderDetails(OrderDetailsDto) {
        orderDetails.push(OrderDetailsDto)
    }

}