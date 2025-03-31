import { CustomerDto } from "../Dto/CustomerDto.js";
import { ItemDto } from "../Dto/ItemDto.js";

export class Database {
  Customers = new Array(new CustomerDto("C00-001", "Praveen", "Galle", 334343));

  Items = new Array(
    new ItemDto("I00-001", "dfdf", 34, 456),
    new ItemDto("I00-002", "ddffdf", 56, 5456)
  );
  Orders = new Array();
  OrderDetails = new Array();
}
