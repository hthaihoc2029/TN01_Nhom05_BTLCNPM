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
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Datepicker initialization
    $("#datepicker1").datepicker({
      format: "mm/dd/yyyy",
      todayHighlight: true,
      startDate: today,
      endDate: "12/25/2023",
      autoclose: true,
    });

    // Set default date for datepicker
    $("#datepicker1").datepicker("setDate", today);

    // Timepicker initialization with restricted hours
    $(".timepicker").timepicker({
      showMeridian: false,
      defaultTime: "07:00",
      maxHours: 17,
      minuteStep: 10,
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
         <option value="Letter"></option>
     </datalist>
 </form>

 <button id="save_config" type="button" onclick="savePrintSettings()">Save</button>
      
     </div>
 </div>
 <h3>File in</h3>
</div>`;
};

function getBtn3Content() {
  return `<div class="row">
  <div class="col-md-6">
    <div class="panel">
      <fieldset>
        <div class="form-group">
          <label for="datepicker1">Chọn ngày</label>
          <div class="input-group">
            <input type="text" class="form-control" id="datepicker1" />
            <span class="input-group-addon">
            <i class="fa-regular fa-calendar"></i>
            </span>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
  <div class="col-md-6">
    <div class="panel">
      <fieldset>
        <div class="form-group">
          <label for="timepicker1">Chọn giờ</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control timepicker"
              id="timepicker1"
            />
            <span class="input-group-addon"
              ><i class="fas fa-clock"></i>
              </span>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</div>`;
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
