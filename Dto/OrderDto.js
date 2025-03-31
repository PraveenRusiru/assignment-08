export class OrderDto{
    orderId;
    customerId;
    total;
    subTotal;
    discount;
    date;
    constructor(orderId,customerId,total,subTotal,discount,date){
        this.orderId=orderId;
        this.customerId=customerId;
        this.total=total;
        this.subTotal=subTotal;
        this.discount = discount;
        this.date=date;
    }
}