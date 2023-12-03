function deleteFile(fileName) {
	// Remove the button and span with the same ID
	$(`#delete-file${fileIds[fileName]}`).remove();
	$(`#span-file${fileIds[fileName]}`).remove();
	$(`#br-delete-file${fileIds[fileName]}`).remove();
	delete fileList[fileName];
	delete printSettings[fileName];
}

const SUPPORTED_EXTENSIONS = ["pdf"];

var srcContents = {};
var fileNames = {};
var fileCount = 1;
var fileList = {};
var printSettings = {};
var userID;
var selectPrinterID;
var files = {};
var fileIds = {};

var tabFocus = "btn1";
var fileFocus = 0;
var fileNameFocus = "";

function readURL(file) {
	var reader = new FileReader();
	reader.onloadend = function (e) {
		let name = file.name;
		srcContents[fileCount] = e.target.result;
		files[name] = e.target.result;
		printSettings[name] = {};
		previewFile(name);
	};
	reader.readAsDataURL(file);
}

function previewFile(fileName) {
	$("#content-upload").remove();
	$("#icon-upload").remove();
	let htmlIframe = `<iframe src="${files[fileName]}" frameborder="0"></iframe>`;
	$(".btn-upload").html(htmlIframe);

	$(".file-print-div").removeClass("file-print_focus");
	$(`#file-print${fileIds[fileName]}`).addClass("file-print_focus");

	applyFocusFile(fileName);
	applyFocusTab();
}

async function uploadFile() {
	if (this.files[0].name !== "") {
		let name = this.files[0].name;
		let extension = name.split(".").at(-1);
		if (!SUPPORTED_EXTENSIONS.includes(extension)) {
			alert("File extension not supported");
			return;
		}

		readURL(this.files[0]);
		let htmlFileName = `
		<div id="file-print${fileCount}" class="file-print-div file-print_focus">
			<button onclick="deleteFile(${name})" class="delete-file" id="delete-file${fileCount}">
				<i class="fa-regular fa-circle-xmark"></i>
			</button>
			<span id='span-file${fileCount}' onclick="previewFile('${name}')">${name}</span>
			<br id='br-delete-file${fileCount}'/>
		</div>
		`;
		fileIds[name] = fileCount;
		fileList[name] = htmlFileName;
		fileCount++;
		$("#btn1").click();
	}
}

function preventOpenFile(e) {
	e.preventDefault();
	e.stopPropagation();
}

function dropHandler(e) {
	e.stopPropagation();
	e.preventDefault();

	var files = e.originalEvent.dataTransfer.files;
	if (files[0].name !== "") {
		let name = files[0].name;
		let extension = name.split(".").at(-1);
		if (!SUPPORTED_EXTENSIONS.includes(extension)) {
			alert("File extension not supported");
			return;
		}
		readURL(files[0]);
		let htmlFileName = `
		<div id="file-print${fileCount}" class="file-print-div file-print_focus">
			<button onclick="deleteFile(${name})" class="delete-file" id="delete-file${fileCount}">
				<i class="fa-regular fa-circle-xmark"></i>
			</button>
			<span id='span-file${fileCount}' onclick="previewFile('${name}')">${name}</span>
			<br id='br-delete-file${fileCount}'/>
		</div>
		`;
		fileIds[name] = fileCount;
		fileList[name] = htmlFileName;
		fileCount++;
		$("#btn1").click();
	}
}

$(document).ready(function () {
	$("#headerbar").html(getMenuContent());

	$("#inputFile").change(uploadFile);

	$("html").on("dragover", preventOpenFile);
	$("html").on("drop", preventOpenFile);

	$("#drop_zone").on("dragenter", preventOpenFile);
	$("#drop_zone").on("dragover", preventOpenFile);

	$("#drop_zone").on("drop", dropHandler);

	$("#btn1").click(button1ClickHandler);
	$("#btn2").click(button2ClickHandler);
	$("#btn3").click(button3ClickHandler);
});

// Lắng nghe sự kiện click trên nút 1
function button1ClickHandler() {
	displayInfo(getBtn1Content());
	for (var name in fileList) $(fileList[name]).appendTo("div.list-files");

	tabFocus = "btn1";
	applyFocusTab();
}

// Lắng nghe sự kiện click trên nút 2
async function button2ClickHandler() {
	displayInfo(await getBtn2Content());

	tabFocus = "btn2";
	applyFocusTab();
}

// Lắng nghe sự kiện click trên nút 3
function button3ClickHandler() {
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

	tabFocus = "btn3";
	applyFocusTab();
}

document.addEventListener("DOMContentLoaded", function () {
	// Get all buttons with class 'btn-select'
	var buttons = document.querySelectorAll(".btn-select");

	// Add click event listener to each button
	buttons.forEach(function (button) {
		button.addEventListener("click", function () {
			// Remove 'clicked' class from all buttons
			buttons.forEach(function (btn) {
				btn.classList.remove("clicked");
			});

			// Add 'clicked' class to the clicked button
			button.classList.add("clicked");
		});
	});
});

// Hàm hiển thị thông tin
function displayInfo(info) {
	// Hiển thị thông tin trong phần tử có id là 'infoDisplay'
	document.getElementById("infoDisplay").innerHTML = info;
}

function applyFocusTab() {
	$("#btn1").removeClass("tab-focus");
	$("#btn2").removeClass("tab-focus");
	$("#btn3").removeClass("tab-focus");
	$(`#${tabFocus}`).addClass("tab-focus");
}

function applyFocusFile(fileName) {
	for (const name in fileIds) {
		$(`#file-print${fileIds[name]}`).removeClass("file-print_focus");
	}
	$(`#file-print${fileIds[fileName]}`).addClass("file-print_focus");
	fileFocus = fileIds[fileName];
	fileNameFocus = fileName;
}

function getBtn1Content() {
	return `
		<div class="content-btn1">
			<div class="config">
				<h3>Thông số in</h3>
			
				<div class="config-action">

					<form action="" id="printForm">
						<div>
							<label>Hướng in: </label> <br />
							<input list="direction" placeholder="Select" id="directionInput" />
							<datalist id="direction">
								<option value="Portrait"></option>
								<option value="Landscape"></option>
							</datalist>
						</div>
					
						<div>
							<label>Số trang: </label> <br />
							<input type="text" placeholder="Enter page range" pattern="[0-9,-]+" title="Enter a valid page range" value="All" id="pageRange" />
							<!-- Set the default value to "All" -->
						</div>
					
						<div>
							<label>Số bản: </label> <br />
							<input type="number" placeholder="Enter number of copies" min="1" id="copy" />
						</div>
					
						<div>
							<label>Kiểu in: </label> <br />
							<input list="pages_per_sheet" placeholder="Select" id="printType" />
							<datalist id="pages_per_sheet">
								<option value="1 mặt"></option>
								<option value="2 mặt"></option>
							</datalist>
						</div>

						<label>Cỡ giấy: </label> <br />
						<input list="paper_size" placeholder="Select" id="paperSize" />
						<datalist id="paper_size">
							<option value="A4"></option>
							<option value="A5"></option>
						</datalist>
					</form>

					<button id="save_config" type="button" onclick="savePrintSettings()">Save</button>
				</div>
			</div>
			<h3>File in</h3>
			<div class="list-files"></div>
		</div>`;
}

async function getBtn2Content() {
	let printers;
	await $.ajax("http://localhost:3001/printers", {
		method: "GET",
		beforeSend: (req) => {
			req.setRequestHeader(
				"Authorization",
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJORDAwMDEiLCJpYXQiOjE3MDE1MzA3NjYsImV4cCI6MTcwMTYwMjc2Nn0.UTVhl5eeZFNkj1xs4DqCTczyPqglKbtv45i8L295FYg"
			);
		},
		success: (data) =>
			(printers = data.filter((value) => {
				return value.TinhTrang === "Working";
			})),
	});

	return `
		<div class="table-title">Máy in khả dụng</div>
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
					${printers.map((printer) => {
						return `
					<tr>
						<td class="btn-printerinfo">
							<a href="">
								<img
									src="./images/user_service/Rectangle 1253.png"
									width="32px"
									height="32px"
									alt=""
								/>
							</a>
						</td>
						<td><b>${printer.Model}</b></td>
						<td>${printer.ID}</td>
						<td>${printer.ViTri}</td>
						<td>HOẠT ĐỘNG</td>
						<td>
							<button type="button" class="btn-select ${
								printer.ID === selectPrinterID ? "clicked" : ""
							}" onclick="selectPrinter('${
							printer.ID
						}')" data-bs-toggle="modal" data-bs-target="#modal">
								<svg xmlns="http://www.w3.org/2000/svg" width="111" height="32" viewBox="0 0 111 32" fill="none">
									<path d="M0.533203 10.0449C0.533203 4.52208 5.01036 0.0449219 10.5332 0.0449219H100.056C105.579 0.0449219 110.056 4.52207 110.056 10.0449V21.9561C110.056 27.4789 105.579 31.9561 100.056 31.9561H10.5332C5.01035 31.9561 0.533203 27.4789 0.533203 21.9561V10.0449Z" fill="url(#paint0_linear_231_8842)" />
									<defs>
										<linearGradient id="paint0_linear_231_8842" x1="8.19712" y1="25.6081" x2="98.9465" y2="-4.91499" gradientUnits="userSpaceOnUse">
											<stop offset="0.0388426" stop-color="#7A34D4" />
											<stop offset="0.0739581" stop-color="#4739D4" stop-opacity="0.926042" />
											<stop offset="0.0791664" stop-color="#5B4FE1" stop-opacity="0.920834" />
											<stop offset="1" stop-color="#0F96D0" stop-opacity="0.8" />
										</linearGradient>
									</defs>
									<text id="text-select" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white" >
										Chọn
									</text>
								</svg>
							</button>
						</td>
					</tr>`;
					})}
				</tbody>
			</table>


<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="modalLabel">Xác nhận</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				Bạn có chắc muốn chọn máy in này không?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
				<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick='confirmSelectPrinter()'>Xác nhận</button>
			</div>
		</div>
	</div>
</div>

		</div>`;
}

function confirmSelectPrinter() {
	printSettings[fileNameFocus].printerID = selectPrinterID;
	$("#btn3").click();
}

function selectPrinter(id) {
	selectPrinterID = id;
}

function getBtn3Content() {
	return `
		<form id="dateForm">
			<label for="selectedDate">
				Chọn ngày (trong vòng 7 ngày kế tiếp, trong giờ hành chính):
			</label>
			<input type="text" id="selectedDate" required />
			<i class="fa-regular fa-calendar"></i>
			<button class="time-date" type="button" onclick="validateDate()">
				Save
			</button>
		</form>
		<form id="timeForm">
			<label for="selectedTime">
				Chọn giờ (trong khoảng 7:00 đến 17:00):
			</label>
			<input type="text" id="selectedTime" required />
			<i class="fa-regular fa-clock"></i>
			<button class="time-date" type="button" onclick="validateTime()">
				Save
			</button>
		</form>
		<button type="button" class="btn-select" onclick="confirmPrint()">
			<svg xmlns="http://www.w3.org/2000/svg" width="111" height="32" viewBox="0 0 111 32" fill="none">
				<path d="M0.533203 10.0449C0.533203 4.52208 5.01036 0.0449219 10.5332 0.0449219H100.056C105.579 0.0449219 110.056 4.52207 110.056 10.0449V21.9561C110.056 27.4789 105.579 31.9561 100.056 31.9561H10.5332C5.01035 31.9561 0.533203 27.4789 0.533203 21.9561V10.0449Z" fill="url(#paint0_linear_231_8842)" />
				<defs>
					<linearGradient id="paint0_linear_231_8842" x1="8.19712" y1="25.6081" x2="98.9465" y2="-4.91499" gradientUnits="userSpaceOnUse">
						<stop offset="0.0388426" stop-color="#7A34D4" />
						<stop offset="0.0739581" stop-color="#4739D4" stop-opacity="0.926042" />
						<stop offset="0.0791664" stop-color="#5B4FE1" stop-opacity="0.920834" />
						<stop offset="1" stop-color="#0F96D0" stop-opacity="0.8" />
					</linearGradient>
				</defs>
				<text id="text-select" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white" >
					Xác nhận in
				</text>
			</svg>
		</button>
	`;
}

async function confirmPrint() {
	// Check if there are any file which haven't been fully configured
	incompleteFiles = {};
	for (const fileName in printSettings) {
		const settings = printSettings[fileName];
		if (
			!settings.printDirection ||
			!settings.pageRange ||
			!settings.copyCount ||
			!settings.printType ||
			!settings.paperType ||
			!settings.printerID ||
			!settings.date ||
			!settings.time
		) {
			incompleteFiles[fileName] = [];

			// Haven't configured print settings
			if (
				!settings.printDirection ||
				!settings.pageRange ||
				!settings.copyCount ||
				!settings.printType ||
				!settings.paperType
			)
				incompleteFiles[fileName].push("configure print settings");

			// Haven't selected a printer
			if (!settings.printerID)
				incompleteFiles[fileName].push("select a printer");

			// Haven't selected a date and time
			if (!settings.date || !settings.time)
				incompleteFiles[fileName].push("select a date and time");
		}
	}

	// If there is a file with incomplete configuration, alert the user then return
	if (Object.keys(incompleteFiles).length > 0) {
		let message = "";
		for (const fileName in incompleteFiles) {
			message += `Please ${incompleteFiles[fileName].join(
				", "
			)} for file ${fileName}\n`;
		}
		alert(message);
		return;
	}

	// Set timestamp for each print file
	for (const fileName in printSettings)
		printSettings[fileName].printTime =
			printSettings[fileName].date + printSettings[fileName].time;

	// Make a POST request for each file
	for (const fileName in printSettings) {
		let temp = {
			fileName,
			filePath: fileName,
			printDirection: printSettings[fileName].printDirection,
			pageCount: printSettings[fileName].pageRange,
			copyCount: printSettings[fileName].copyCount,
			printType: printSettings[fileName].printType,
			paperType: printSettings[fileName].paperType,
			printerID: printSettings[fileName].printerID,
			printTime: printSettings[fileName].printTime,
		};
		await $.ajax("http://localhost:3001/printing", {
			method: "POST",
			contentType: "application/json",
			beforeSend: function (request) {
				request.setRequestHeader(
					"Authorization",
					`Bearer ${Cookies.get("accessToken")}`
				);
			},
			data: JSON.stringify(temp),
			success: (data) => {
				console.log(data);
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
}

function savePrintSettings() {
	// Get values from the forms
	var direction = document.querySelector("#directionInput").value;
	var pageRange = document.querySelector("#pageRange").value;
	var numCopies = document.querySelector("#copy").value;
	var printType = document.querySelector("#printType").value;
	var paperSize = document.querySelector("#paperSize").value;

	// Check if any field is empty
	if (!direction || !pageRange || !numCopies || !printType || !paperSize) {
		alert(`Vui lòng điền đầy đủ thông tin!`);
		return;
	}

	// Perform save or further processing here
	printSettings[fileNameFocus].printDirection = direction;
	printSettings[fileNameFocus].pageRange = pageRange;
	printSettings[fileNameFocus].copyCount = numCopies;
	printSettings[fileNameFocus].printType = printType;
	printSettings[fileNameFocus].paperType = paperSize;

	var message = `Hướng in: ${direction}\nSố trang: ${pageRange}\nSố bản: ${numCopies}\nKiểu in: ${printType}\nCỡ giấy: ${paperSize}`;
	alert(
		`Thông số đã được lưu thành công cho file ${fileNameFocus}!\n\n${message}`
	);
	$("#btn2").click();
}

function validateDate() {
	const inputDate = $("#selectedDate").datepicker("getDate");

	// Check if selected date is not null
	if (inputDate !== null) {
		alert("Date is valid!");
		printSettings[fileNameFocus].date = inputDate.getTime();
	} else {
		alert(
			"Please select a valid date within the next 7 days (excluding weekends)."
		);
	}
}

function validateTime() {
	const selectedTime = $("#selectedTime").val();

	// Check if selected time is not empty
	if (selectedTime !== "") {
		alert("Time is valid!");
		let temp = selectedTime.split(":");
		printSettings[fileNameFocus].time = temp[0] * 3600 + temp[1] * 60;
	} else {
		alert(
			"Please select a valid time between 7:00 and 17:00 with 30-minute intervals."
		);
	}
}
