import { CustomerModel } from "../Model/CustomerModel.js";
import { CustomerDto } from "../Dto/CustomerDto.js";
let idValid = false;
let nameValid = false;
let addressValid = false;
let salaryValid = false;
let customerModel = new CustomerModel();
$(document).ready(function () {
  validation();
  // $("#customerRegistration").submit(function (event) {
  //   event.preventDefault();
  //   console.log("Document is ready");
  //   validation();
  // });
  $(document).on("click", "#tblCustomerBody  tr", function () {
    let rowData = $(this)
      .find("td")
      .map(function () {
        return $(this).text().trim(); // Trim to remove unnecessary spaces
      })
      .get(); // Convert jQuery object to an array

    console.log("Selected Row Data:", rowData);
    $("#txtId").val(rowData[0]);
    $("#txtId").prop("disabled", true);
    $("#saveBtn").prop("disabled", true);
    $("#txtName").val(rowData[1]);
    $("#txtAddress").val(rowData[2]);
    $("#txtSalary").val(rowData[3]);
  });
  $("#updateBtn").click(function (event) {
    event.preventDefault();
    if (idValid && nameValid && addressValid && salaryValid) {
      let Customer = new CustomerDto(
        $("#txtId").val(),
        $("#txtName").val(),
        $("#txtAddress").val(),
        $("#txtSalary").val()
      );
      customerModel.UpdateCustomer(Customer);

      let row = $(`#tblCustomerBody tr[data-id="${Customer.id}"]`);
      row.find("td:nth-child(2)").text(Customer.name);
      row.find("td:nth-child(3)").text(Customer.address);
      row.find("td:nth-child(4)").text(Customer.salary);
      alert("Form Submitted");
      $("#txtId").prop("disabled", false);
      $("#saveBtn").prop("disabled", false);
      clearFields();
    } else {
      alert("Form Not Submitted");
    }
  });
  $("#saveBtn").click(function (event) {
    event.preventDefault();
    if (idValid && nameValid && addressValid && salaryValid) {
      let Customer = new CustomerDto(
        $("#txtId").val(),
        $("#txtName").val(),
        $("#txtAddress").val(),
        $("#txtSalary").val()
      );
      customerModel.SaveCustomer(Customer);

      addingToRow(Customer);
      alert("Form Submitted");
    } else {
      alert("Form Not Submitted");
    }
  });
  $("#deleteBtn").click(function (event) {
      event.preventDefault();
      let id = $("#txtId").val();
      customerModel.DeleteCustomer(id);
      $(`tr[data-id="${id}"]`).remove();
      clearFields();

  });
    $("#getAllBtn").click(function (event) {
        event.preventDefault();
        let customers = customerModel.GetAll();
        customers.forEach((customer) => {
            addingToRow(customer);
        });
    });
    $("#clearAll").click(function (event) {
        event.preventDefault();
        $("#tblCustomerBody").empty();
    });
  function addingToRow(Customer) {
    $("#tblCustomerBody").append(
      `<tr data-id="${Customer.id}">
        <td>${Customer.id}</td>
        <td>${Customer.name}</td>
        <td>${Customer.address}</td>
        <td>${Customer.salary}</td>
        </tr>`
    );
    clearFields();
  }
  function clearFields() {
    $("#txtId").val("");
    $("#txtName").val("");
    $("#txtAddress").val("");
    $("#txtSalary").val("");
  }
  function validation() {
    $("#txtId").on("keyup", function () {
      let value = $(this).val();
      if (/^C\d{2}-\d{3}$/.test(value)) {
        if (customerModel.CheckCustomer($("#txtId").val())) {
          alert("Customer Already Exists");
          idValid = false;
          $("#idError").hide();
        } else {
          idValid = true;
          $("#idError").hide();
        }
      } else {
        idValid = false;
        $("#idError").show();
      }
    });

    $("#txtName").on("keyup", function () {
      let value = $(this).val();
      if (/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
        nameValid = true;
        $("#nameError").hide();
      } else {
        nameValid = false;
        $("#nameError").show();
      }
    });

    $("#txtAddress").on("keyup", function () {
      let value = $(this).val();
      if (/^[A-Za-z0-9\s,./-]+$/.test(value)) {
        addressValid = true;
        $("#addressError").hide();
      } else {
        addressValid = false;
        $("#addressError").show();
      }
    });

    $("#txtSalary").on("keyup", function () {
      let value = $(this).val();
      if (/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
        salaryValid = true;
        $("#salaryError").hide();
      } else {
        salaryValid = false;
        $("#salaryError").show();
      }
    });
  }

  console.log(
    "ID :" +
      idValid +
      " Name :" +
      nameValid +
      " Address :" +
      addressValid +
      " Salary :" +
      salaryValid
  );
});
