export function getAllElements() {
    /**@type { HTMLInputElement } */
    const fileInput = document.getElementById("file-input");

    /**@type { HTMLButtonElement } */
    const convertBtn = document.getElementById("convert-btn");

    /**@type { HTMLParagraphElement } */
    const resultTextElement = document.getElementById("result-text");

    /**@type { HTMLAnchorElement } */
    const downloadBtn = document.getElementById("download-btn");

    /**@type { HTMLInputElement } */
    const langInput = document.getElementById("lang-input");

    return {
        fileInput,
        convertBtn,
        resultTextElement,
        downloadBtn,
        langInput
    };
}