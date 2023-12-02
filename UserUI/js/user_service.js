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
		displayInfo(getBtn2Content());
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

let getBtn2Content = function () {
	return `<div class="table-title">Máy in khả dụng</div>
   <div class="table-header">
     <table>
       <thead>
         <tr>
           <th></th>
           <th>MODEL</th>
           <th>ID</th>
           <th>VỊ TRÍ</th>
           <th>TÌNH TRẠNG</th>
           <th></th>
         </tr>
       </thead>
     </table>
   </div>
   <div class="table-content">
     <table>
       <tbody>
         <tr>
           <td class="btn-printerinfo">
             <a href="printer-info.html"
               ><img
                 src="./images/user_service/Rectangle 1253.png"
                 width="32px"
                 height="32px"
                 alt=""
             /></a>
           </td>
           <td><b>HP - MFP M236SDW</b></td>
           <td>0001</td>
           <td>202C6</td>
           <td>HOẠT ĐỘNG</td>
           <td>
             <button class="btn-select">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="111"
                 height="32"
                 viewBox="0 0 111 32"
                 fill="none"
               >
                 <path
                   d="M0.533203 10.0449C0.533203 4.52208 5.01036 0.0449219 10.5332 0.0449219H100.056C105.579 0.0449219 110.056 4.52207 110.056 10.0449V21.9561C110.056 27.4789 105.579 31.9561 100.056 31.9561H10.5332C5.01035 31.9561 0.533203 27.4789 0.533203 21.9561V10.0449Z"
                   fill="url(#paint0_linear_231_8842)"
                 />
                 <defs>
                   <linearGradient
                     id="paint0_linear_231_8842"
                     x1="8.19712"
                     y1="25.6081"
                     x2="98.9465"
                     y2="-4.91499"
                     gradientUnits="userSpaceOnUse"
                   >
                     <stop offset="0.0388426" stop-color="#7A34D4" />
                     <stop
                       offset="0.0739581"
                       stop-color="#4739D4"
                       stop-opacity="0.926042"
                     />
                     <stop
                       offset="0.0791664"
                       stop-color="#5B4FE1"
                       stop-opacity="0.920834"
                     />
                     <stop
                       offset="1"
                       stop-color="#0F96D0"
                       stop-opacity="0.8"
                     />
                   </linearGradient>
                 </defs>
                 <text
                 id="text-select"
                   x="50%"
                   y="50%"
                   dominant-baseline="middle"
                   text-anchor="middle"
                   font-size="20"
                   fill="white"
                 >
                   Chọn
                 </text>
               </svg>
             </button>
           </td>
         </tr>
         <tr>
           <td class="btn-printerinfo">
             <a href="printer-info.html"
               ><img
                 src="./images/user_service/Rectangle 1253.png"
                 width="32px"
                 height="32px"
                 alt=""
             /></a>
           </td>
           <td><b>BROTHER - DCPT720</b></td>
           <td>0002</td>
           <td>303B4</td>
           <td>HOẠT ĐỘNG</td>
           <td>
             <button class="btn-select">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="111"
                 height="32"
                 viewBox="0 0 111 32"
                 fill="none"
               >
                 <path
                   d="M0.533203 10.0449C0.533203 4.52208 5.01036 0.0449219 10.5332 0.0449219H100.056C105.579 0.0449219 110.056 4.52207 110.056 10.0449V21.9561C110.056 27.4789 105.579 31.9561 100.056 31.9561H10.5332C5.01035 31.9561 0.533203 27.4789 0.533203 21.9561V10.0449Z"
                   fill="url(#paint0_linear_231_8842)"
                 />
                 <defs>
                   <linearGradient
                     id="paint0_linear_231_8842"
                     x1="8.19712"
                     y1="25.6081"
                     x2="98.9465"
                     y2="-4.91499"
                     gradientUnits="userSpaceOnUse"
                   >
                     <stop offset="0.0388426" stop-color="#7A34D4" />
                     <stop
                       offset="0.0739581"
                       stop-color="#4739D4"
                       stop-opacity="0.926042"
                     />
                     <stop
                       offset="0.0791664"
                       stop-color="#5B4FE1"
                       stop-opacity="0.920834"
                     />
                     <stop
                       offset="1"
                       stop-color="#0F96D0"
                       stop-opacity="0.8"
                     />
                   </linearGradient>
                 </defs>
                 <text
                  id="text-select"
                   x="50%"
                   y="50%"
                   dominant-baseline="middle"
                   text-anchor="middle"
                   fill="white"
                 >
                   Chọn
                 </text>
               </svg>
             </button>
           </td>
         </tr>
       </tbody>
     </table>
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
