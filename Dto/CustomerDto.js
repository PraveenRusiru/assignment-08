
export class CustomerDto{
    id;
    name;
    address;
    salary;
    constructor(id,name,address,salary){
        this.id=id;
        this.name=name;
        this.address=address;
        this.salary=salary;
    }
    getId(){
        return this.id;
    }
    setId(id){
        this.id=id;
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name=name;
    }
    getAddress(){
        return this.address;
    }
    setAddress(address){
        this.address=address;
    }
    getSalary(){
        return this.salary;
    }
    setSalary(salary){
        this.salary=salary;
    }
}