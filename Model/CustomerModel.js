import { Database } from '../DB/Database.js'
let customers = new Database().Customers;
export class CustomerModel {
  SaveCustomer(CustomerDto) {
    //     if (customers.some(customer => customer.id === CustomerDto.id)) {

    //   }
    customers.push(CustomerDto);
    customers.forEach((element) => {
      console.log(" Id in model:" + element.id +" "+element.salary);
    });
  }
    CheckCustomer(id) {
      customers.forEach((element) => {
        console.log(" Id in model:" + element.id + " " + element.salary);
      });
    return customers.some((customer) => customer.id === id);
  }
  UpdateCustomer(CustomerDto) {
      
       let customer = customers.find(c => c.id === CustomerDto.id);
       if (customer) {
         Object.assign(customer, CustomerDto);
        alert("Updated Customer:", customer);
       } else {
         alert("Customer not found!");
       }
  }
    DeleteCustomer(id) {
        customers = customers.filter((customer) => customer.id !== id);
        console.log(customers)
        alert("Deleted Customer");
    }
    GetAll() {
        return customers;
    } 
     getCustomerById(customerId) {
    return customers.find(customer => customer.id === customerId);
}
}
