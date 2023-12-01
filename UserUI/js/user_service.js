$(document).ready(function () {
  $("#headerbar").html(getMenuContent());
});

document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện click trên nút 1
  document.getElementById("btn1").addEventListener("click", function () {
    displayInfo(getBtn1Content());
  });

  // Lắng nghe sự kiện click trên nút 2
  document.getElementById("btn2").addEventListener("click", function () {
    displayInfo("Thông tin cho bước 2");
  });

  // Lắng nghe sự kiện click trên nút 3
  document.getElementById("btn3").addEventListener("click", function () {
    displayInfo(getBtn3Content());
    $("#selectedTime").timepicker({
      timeFormat: "H:i", // 24-hour format
      minTime: "7:00am",
      maxTime: "5:00pm",
      step: 30, // 30-minute intervals
    });
    $("#selectedDate").datepicker({
      minDate: 0, // Minimum date is today
      maxDate: "+7D", // Maximum date is 7 days from today
      beforeShowDay: function (date) {
        // Disable weekends (Saturday: 6, Sunday: 0)
        var day = date.getDay();
        return [day !== 0 && day !== 6, ""];
      },
    });
  });

  // Hàm hiển thị thông tin
  function displayInfo(info) {
    // Hiển thị thông tin trong phần tử có id là 'infoDisplay'
    document.getElementById("infoDisplay").innerHTML = info;
  }
});

let getBtn1Content = function () {
  return `<div class="content-btn1">

  <div class="config">
     <h3>Thông số in</h3>
 
     <div class="config-action">

     <form action="" id="printForm">
     <label>Hướng in: </label> <br />
     <input list="direction" placeholder="Select" id="directionInput" />
     <datalist id="direction">
         <option value="Portrait"></option>
         <option value="Landscape"></option>
     </datalist>
 </form>

 <form action="" id="pageRangeForm">
     <label>Số trang: </label> <br />
     <input type="text" placeholder="Enter page range" pattern="[0-9,-]+" title="Enter a valid page range" value="All" id="pageRangeInput" />
     <!-- Set the default value to "All" -->
 </form>

 <form action="" id="copyForm">
     <label>Số bản: </label> <br />
     <input type="number" placeholder="Enter number of copies" min="1" id="copyInput" />
 </form>

 <form action="" id="printTypeForm">
     <label>Kiểu in: </label> <br />
     <input list="pages_per_sheet" placeholder="Select" id="printTypeInput" />
     <datalist id="pages_per_sheet">
         <option value="1 mặt"></option>
         <option value="2 mặt"></option>
     </datalist>
 </form>

 <form action="" id="paperSizeForm">
     <label>Cỡ giấy: </label> <br />
     <input list="paper_size" placeholder="Select" id="paperSizeInput" />
     <datalist id="paper_size">
         <option value="A4"></option>
         <option value="A5"></option>
     </datalist>
 </form>

 <button id="save_config" type="button" onclick="savePrintSettings()">Save</button>
      
     </div>
 </div>
 <h3>File in</h3>
 <div class="list-files">
 </div>
</div>`;
};

function getBtn3Content() {
  return `<form id="dateForm">
  <label for="selectedDate"
    >Chọn ngày (trong vòng 7 ngày kế tiếp, trong giờ hành chính):</label
  >
  <input type="text" id="selectedDate" required />
  <i class="fa-regular fa-calendar"></i>
  <button class="time-date" type="button" onclick="validateDate()">
    Save
  </button>
</form>
<form id="timeForm">
  <label for="selectedTime"
    >Chọn giờ (trong khoảng 7:00 đến 17:00):</label
  >
  <input type="text" id="selectedTime" required />
  <i class="fa-regular fa-clock"></i>
  <button class="time-date" type="button" onclick="validateTime()">
    Save
  </button>
</form>`;
}

function savePrintSettings() {
  // Get values from the forms
  var direction = document.querySelector("#directionInput").value;
  var pageRange = document.querySelector("#pageRangeInput").value;
  var numCopies = document.querySelector("#copyInput").value;
  var printType = document.querySelector("#printTypeInput").value;
  var paperSize = document.querySelector("#paperSizeInput").value;

  // Check if any field is empty
  if (!direction || !pageRange || !numCopies || !printType || !paperSize) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // Perform save or further processing here
  var message =
    "Hướng in: " +
    direction +
    "\nSố trang: " +
    pageRange +
    "\nSố bản: " +
    numCopies +
    "\nKiểu in: " +
    printType +
    "\nCỡ giấy: " +
    paperSize;
  alert("Thông số đã được lưu thành công!\n\n" + message);
}
