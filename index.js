/**@type {HTMLInputElement} */
const pickerInput = document.getElementById("picker-input");

/**@type {HTMLButtonElement} */
const pickerLoadBtn = document.getElementById("picker-load-btn");

/**@type {HTMLParagraphElement} */
const contentTextElem = document.getElementById("content-text");

/**@type {HTMLAnchorElement} */
const downloadBtn = document.getElementById("download-btn");

/**@type {HTMLInputElement} */
const subLangInput = document.getElementById("sub-lang");




let convertedSrt = "";

let downloadBlob = new Blob();

let subLangExt = "";


/**@type {string[]} */
const srtTimelines = [];


/**@param {number} oldSeconds */
function getTimeFromSeconds(oldSeconds) {
    const milisecondsStr = (oldSeconds - (oldSeconds << 0)).toFixed(3).slice(2);
    const fullSeconds = oldSeconds << 0;
    
    let seconds = 0;
    let secondsStr = "00";

    let minutes = 0;
    let minutesStr = "00";

    let hours = 0;
    let hoursStr = "00";

    if (fullSeconds < 60) {
        seconds = fullSeconds;
    } else {
        minutes = (fullSeconds / 60) << 0;
        seconds = fullSeconds - minutes * 60;
    }

    if (minutes > 59) {
        hours = (minutes / 60) << 0;
        minutes = minutes - hours * 60
    }

    secondsStr = (seconds > 9) ? `${seconds}` : `0${seconds}`;
    minutesStr = (minutes > 9) ? `${minutes}` : `0${minutes}`;
    hoursStr = (hours > 9) ? `${hours}` : `0${hours}`;
 
    return `${hoursStr}:${minutesStr}:${secondsStr}.${milisecondsStr}`;
}

pickerLoadBtn.addEventListener("click", async () => {
    const pickedJson = await pickerInput.files[0].text();
    const pickedObj = JSON.parse(pickedJson);
    console.log(pickedObj);

    /**@type {Array<{from: number, to: number, content: string}>} */
    const pickedObjBody = pickedObj.body;


    const timeFrom = getTimeFromSeconds(pickedObjBody.at(1).from);

    const timeTo = getTimeFromSeconds(pickedObjBody.at(1).to);


    pickedObjBody.forEach((value) => {
        const timeFrom = getTimeFromSeconds(value.from);
        const timeTo = getTimeFromSeconds(value.to);

        srtTimelines.push(`${timeFrom} --> ${timeTo}\n${value.content}`);

    });

    convertedSrt = `WEBVTT\nKind: captions\nLanguage: en\n\n`+ srtTimelines.join('\n\n');
    
    contentTextElem.innerText = convertedSrt;

    downloadBlob = new Blob([convertedSrt], { type: "text/plain" });

   
});


downloadBtn.addEventListener("click", () => {
    if (subLangInput.value != null && subLangInput.value != '') {
        subLangExt = `.${subLangInput.value}`
    } else {
        subLangExt = '';
    }
    
    downloadBtn.download = pickerInput.files[0].name.slice(0, -5) + subLangExt + ".srt";

    downloadBtn.href = URL.createObjectURL(downloadBlob);
});

