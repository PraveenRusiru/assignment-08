import { ItemDto } from "../Dto/ItemDto.js";
import { ItemModel } from "../Model/ItemModel.js";
let idValid = false;
let nameValid = false;
let addressValid = false;
let salaryValid = false;
let itemModel = new ItemModel();
$(document).ready(function () { 
    validation();
    console.log("Loaded")
    $(document).on("click", "#tblItemBody  tr", function () {
      let rowData = $(this)
        .find("td")
        .map(function () {
          return $(this).text().trim(); // Trim to remove unnecessary spaces
        })
        .get(); // Convert jQuery object to an array

      console.log("Selected Row Data:", rowData);
      $("#txtItemId").val(rowData[0]);
      $("#txtItemId").prop("disabled", true);
      $("#saveItemBtn").prop("disabled", true);
      $("#txtItemName").val(rowData[1]);
      $("#txtQty").val(rowData[2]);
      $("#txtPrice").val(rowData[3]);
    });

   $("#updateItemBtn").click(function (event) {
     event.preventDefault();
     if (idValid && nameValid && addressValid && salaryValid) {
       let Item = new ItemDto(
         $("#txtItemId").val(),
         $("#txtItemName").val(),
         $("#txtQty").val(),
         $("#txtPrice").val()
       );
       itemModel.UpdateItem(Item);

       let row = $(`#tblItemBody tr[data-item-id="${Item.id}"]`);
       row.find("td:nth-child(2)").text(Item.name);
       row.find("td:nth-child(3)").text(Item.qty);
       row.find("td:nth-child(4)").text(Item.price);
       alert("Form Submitted");
       $("#txtItemId").prop("disabled", false);
       $("#saveItemBtn").prop("disabled", false);
       clearFields();
     } else {
       alert("Form Not Submitted");
     }
   });
    $("#saveItemBtn").click(function (event) {
      event.preventDefault();
      console.log("Save");
      if (idValid && nameValid && addressValid && salaryValid) {
        let Item = new ItemDto(
          $("#txtItemId").val(),
          $("#txtItemName").val(),
          $("#txtQty").val(),
          $("#txtPrice").val()
        );
        itemModel.SaveItem(Item);

        addingToRow(Item);
        alert("Form Submitted");
      } else {
        alert("Form Not Submitted");
      }
    });
    $("#deleteItemBtn").click(function (event) {
      event.preventDefault();
      let id = $("#txtItemId").val();
      itemModel.DeleteItem(id);
      $(`tr[data-item-id="${id}"]`).remove();
      clearFields();
    });
    $("#getAllItemBtn").click(function (event) {
      event.preventDefault();
      let items = itemModel.GetAll();
      items.forEach((item) => {
        addingToRow(item);
      });
    });
    $("#clearItemAll").click(function (event) {
      event.preventDefault();
      $("#tblItemBody").empty();
    });
    function addingToRow(Item) {
        console.log("Adding to Row")
      $("#tblItemBody").append(
        `<tr data-item-id="${Item.id}">
        <td>${Item.id}</td>
        <td>${Item.name}</td>
        <td>${Item.qty}</td>
        <td>${Item.price}</td>
        </tr>`
      );
      clearFields();
    }
    function clearFields() {
      $("#txtItemId").val("");
      $("#txtItemName").val("");
      $("#txtQty").val("");
      $("#txtPrice").val("");
    }
    function validation() {
      $("#txtItemId").on("keyup", function () {
        let value = $(this).val();
        if (/^I\d{2}-\d{3}$/.test(value)) {
          if (itemModel.CheckItem($("#txtItemId").val())) {
            alert("Item Already Exists");
            idValid = false;
            $("#idItemError").hide();
          } else {
            idValid = true;
            $("#idItemError").hide();
          }
        } else {
          idValid = false;
          $("#idItemError").show();
        }
      });

      $("#txtItemName").on("keyup", function () {
        let value = $(this).val();
        if (/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
          nameValid = true;
          $("#nameItemError").hide();
        } else {
          nameValid = false;
          $("#nameItemError").show();
        }
      });

      $("#txtQty").on("keyup", function () {
        let value = $(this).val();
        if (/^[1-9]\d{0,3}$/.test(value)) {
          addressValid = true;
          $("#qtyError").hide();
        } else {
          addressValid = false;
          $("#qtyError").show();
        }
      });

      $("#txtPrice").on("keyup", function () {
        let value = $(this).val();
        if (/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
          salaryValid = true;
          $("#priceError").hide();
        } else {
          salaryValid = false;
          $("#priceError").show();
        }
      });
    }
});