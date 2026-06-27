import { convertFromJson, getBaseName } from "./scripts/converter.js";
import { getAllElements } from "./scripts/dom-handler.js";


const { 
    fileInput,
    convertBtn, 
    resultTextElement, 
    downloadBtn, 
    langInput 
} = getAllElements();


/**@type { Blob } */
let downloadBlob = null;
let language = langInput.value;


convertBtn.onclick = async () => {
    const json = await fileInput.files[0].text();
    const convertedSubs = convertFromJson(json, language);
    
    resultTextElement.innerText = convertedSubs;
    downloadBlob = new Blob([convertedSubs], { type: "text/plain" });
};


downloadBtn.onclick = () => {  
    const baseName = getBaseName(fileInput.files[0].name);
    downloadBtn.download = baseName + ".srt";
    downloadBtn.href = URL.createObjectURL(downloadBlob);
};


langInput.addEventListener('input', (event) => {
    language = event.currentTarget.value;
});

window.addEventListener('load', async () => {
    try {
        navigator.serviceWorker.register("/json-to-srt-converter-pwa/cache-worker.js", { scope: "/json-to-srt-converter-pwa/" });
        console.log("Cache worker registered");
    } catch (err) {
        console.error("Can't register cache worker. " + err);
    }
});