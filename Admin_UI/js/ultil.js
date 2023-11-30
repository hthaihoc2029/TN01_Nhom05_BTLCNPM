// Function for preprocessing input
function preprocessInput(speed, memory, resolution, capacity, watt, weight, shape) {
    const units = [" trang/phút", " MB", " dpi", " tờ/khay", " tờ", " kg", " mm"];
    const inputArray = [speed, memory, resolution, capacity, watt, weight, shape];
    for (let i = 0; i < inputArray.length; i++) {
        inputArray[i] = inputArray[i].toLowerCase()
        let unit = units[i];

        if (!inputArray[i].includes(unit)) {
            inputArray[i] += unit;
        }
        inputArray[i] = inputArray[i].replace(/\s+/g, ' ').trim();
        if (i === 2 || i === 6) {
            inputArray[i] = inputArray[i].replace(/x/g, ' x ').replace(/\s+/g, ' ').trim();
        }
    }
    return inputArray;
}

// Function for validation
function validateInput(speed, memory, resolution, capacity, watt, weight, shape) {
    const regex1 = /^\d+ trang\/phút$/;
    const regex2 = /^\d+ MB$/;
    const regex3 = /^(\d+(\.\d+)?) x (\d+(\.\d+)?) dpi$/;
    const regex4 = /^\d+ tờ\/khay$/;
    const regex5 = /^\d+ tờ$/;
    const regex6 = /^(\d+(\.\d+)?) kg$/;
    const regex7 = /^(\d+(\.\d+)?) x (\d+(\.\d+)?) x (\d+(\.\d+)?) mm$/;

    const regexArray = [regex1, regex2, regex3, regex4, regex5, regex6, regex7];
    const processedInputArray = [speed, memory, resolution, capacity, watt, weight, shape];
    console.log(processedInputArray)
    for (let i = 0; i < regexArray.length; i++) {
        const regex = regexArray[i];

        if (!regex.test(processedInputArray[i])) {
            return false;
        }
    }

    return true;
}

function escapeHtml(input) {
    input = input.replace(/</g, "&lt;");
    input = input.replace(/>/g, "&gt;");
    input = input.replace(/&/g, "&amp;");
    return input;
}

function showToast(id,msg){
    $('.toast-message').html(msg)
    let toast = new bootstrap.Toast($(`#${id}`))
    toast.show()
}