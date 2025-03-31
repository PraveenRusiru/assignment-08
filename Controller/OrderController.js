import { OrderModel } from "../Model/OrderModel.js";
import { OrderDto } from "../Dto/OrderDto.js";
import { OrderDetailDto } from "../Dto/OrderDetailsDto.js";
import { ItemModel } from "../Model/ItemModel.js";
import { CustomerModel } from "../Model/CustomerModel.js";
import { OrderDetailsModel } from "../Model/OrderDetailsModel.js";
let isOrderIdValid = false;
let isQtyValid = false;
let isCashValid = false;
let orderModel = new OrderModel();
let itemModel = new ItemModel();
let customerModel = new CustomerModel();
let orderDetailsModel = new OrderDetailsModel();
let items;
let total=0;
let discount=0;
let cash=0;
let customers;
$(document).ready(function () {
  console.log("Loaded order");
  validation();
  $("#itemDropDown").click(function () {
    $("#itemDropDown").find("option:not(:first)").remove();
    setDataForItemDropDown();
  });
    $("#itemDropDown").change(function () { 
        let id = $(this).val();
        console.log("Item " + id);
        let item = itemModel.getItemById(id);
        console.log(item.name + " " + item.price);
        $("#itemCodeTxt").val(item.id);
        $("#itemNameTxt").val(item.name);
        $("#itemPriceTxt").val(item.price);
        $("#itemQtyOnHandTxt").val(item.qty);

    }); 
  function setDataForItemDropDown() {
    items = new ItemModel().GetAll();
    let options = [];
    for (let item of items) {
      options.push({ value: item.id, text: item.id });
    }
    options.forEach(function (option) {
      $("#itemDropDown").append(new Option(option.text, option.value));
    });
  }
    $("#customerDropDown").change(function () {
      let id = $(this).val();
      console.log("Customer " + id);
      let customer = customerModel.getCustomerById(id);
      console.log(customer.name + " " + customer.salary);
        $("#customerNameTxt").val(customer.name);
        $("#customerIdTxt").val(customer.id);
      $("#customerSalaryTxt").val(customer.salary);
      $("#customerAddressTxt").val(customer.address);
  });
  $("#customerDropDown").click(function () {
    $("#customerDropDown").find("option:not(:first)").remove();
    setDataForCustomerDropDown();
  });
  function setDataForCustomerDropDown() {
    customers = new CustomerModel().GetAll();

    let options = [];
    for (let customer of customers) {
      options.push({ value: customer.id, text: customer.id });
    }

    options.forEach(function (option) {
      $("#customerDropDown").append(new Option(option.text, option.value));
    });
  }
    $("#addItemBtn").click(function (event) {
        event.preventDefault();
        if (isOrderIdValid && isQtyValid) {
            total += $("#itemPriceTxt").val() * $("#orderQtyTxt").val();
            let orderDetail = new OrderDetailDto(
              $("#itemCodeTxt").val(),
              $("#txtOrderId").val(),
              $("#orderQtyTxt").val(),
            );
            orderDetailsModel.SaveOrderDetails(orderDetail);
            addingToRow();
            calculatingTotal();
            alert("Item Added");
        } else {
            alert("Form Not Submitted");
        }
    });
    function calculatingTotal() {
        $("#totalLbl").text(total-discount);
        calculatingSubTotal();
    }
    function calculatingSubTotal() {
        $("#subTotalLbl").text(total - discount);
    }
    function calculatingBalance() {
        $("#balanceTxt").val(cash - total - discount); 
    }
    function addingToRow() {
        $("#tblorderBody").append(
          `<tr>
        <td>${$("#itemCodeTxt").val()}</td>
        <td>${$("#itemNameTxt").val()}</td>
        <td>${$("#itemPriceTxt").val()}</td>
        <td>${$("#orderQtyTxt").val()}</td>
        <td>${$("#itemPriceTxt").val() * $("#orderQtyTxt").val()}</td>
        </tr>`
        );
        clearFields();
    }
    function clearFields() { 
        $("#itemCodeTxt").val("");
        $("#itemNameTxt").val("");
        $("#itemPriceTxt").val("");
        $("#itemQtyOnHandTxt").val("");
        $("#orderQtyTxt").val("");
    }
    $("#addItemBtn").click(function () {
        let orderDto = new OrderDto(
          $("#txtOrderId").val(),
          $("#customerIdTxt").val(),
          $("#totalLbl").val(),
          $("#subTotalLbl").val(),
          $("#discountTxt").val(),
          $("#datepicker").val()
        );
        orderModel.SaveOrder(orderDto);
    });
  function validation() {
    $("#txtOrderId").on("keyup", function () {
      let value = $(this).val();
      if (/^O\d{2}-\d{3}$/.test(value)) {
        console.log("OrderId Valid");
        if (orderModel.CheckOrder($("#txtOrderId").val())) {
          alert("OrderId Already Exists");
          isOrderIdValid = false;
          $("#orderIdError").hide();
        } else {
          isOrderIdValid = true;
          $("#orderIdError").hide();
        }
      } else {
        console.log("OrderId notValid");
        isOrderIdValid = false;
        $("#orderIdError").show();
      }
    });
      $("#orderQtyTxt").on("keyup", function () {
        if ($("#itemQtyOnHandTxt").val() < $("#orderQtyTxt").val()) {
          isQtyValid = false;
          console.log(
            "Order Qty should be less than " + $("#itemQtyOnHandTxt").val()
          );
          $("#orderQtyError").text(
            "Order Qty should be less than " + $("#itemQtyOnHandTxt").val()
          );
          $("#orderQtyError").show();
        } else {
          isQtyValid = true;
          $("#orderQtyError").hide();
        }
      });
      
      $("#cashTxt").on("keyup", function () {
          cash = $("#cashTxt").val();
          console.log("Cash " + cash);
          if (total>$(this).val) {
              isCashValid = false;
              $("#cashError").show();
          } else {
              isCashValid = true;
              $("#cashError").hide();
          }
          calculatingBalance();
      });
      $("#discountTxt").on("keyup", function () {
          discount = $("#discountTxt").val();
          calculatingSubTotal();
          calculatingTotal();
      });
  }
});
