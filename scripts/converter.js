// @ts-check

/** Types
 * @typedef {{ from: number, to: number, content: string }} TimelineObj - timelines in JSON's body array
 * @typedef {{ body: TimelineObj[] }} JsonSubs - type for JSON
 */



/**@type { function(number): string } */
function getFullTimeFromSeconds(timeInSeconds) {
    let seconds = ~~(timeInSeconds); // drop decimal part
    const milis = timeInSeconds - seconds; // milis

    let minutes = ~~(seconds / 60);
    seconds -= minutes * 60;

    let hours = ~~(minutes / 60);
    minutes -= hours * 60;

    const milisStr = milis.toFixed(3).slice(2);
    let secondsStr = (seconds > 9) ? `${seconds}` : `0${seconds}`;
    let minutesStr = (minutes > 9) ? `${minutes}` : `0${minutes}`;
    let hoursStr = (hours > 9) ? `${hours}` : `0${hours}`;
 
    return `${hoursStr}:${minutesStr}:${secondsStr}.${milisStr}`;
}



/**@type { function(string, string): string }*/
export function convertFromJson(json, language) {
    /**@type { string[] } */
    const convertedTimelines = [];

    /**@type { JsonSubs } */
    const subs = JSON.parse(json);
    const timelines = subs.body;

    for (const timeline of timelines) {
        const timeFrom = getFullTimeFromSeconds(timeline.from);
        const timeTo = getFullTimeFromSeconds(timeline.to);
        convertedTimelines.push(`${timeFrom} --> ${timeTo}\n${timeline.content}`);
    }

    return `WEBVTT\nKind: captions\nLanguage: ${language}\n\n` + convertedTimelines.join('\n\n');
}


/**@type { function(string): string } */
export function getBaseName(name) {
    const baseNameArr = name.split('.');

    if (baseNameArr.length === 1) return name; // if no extension return back

    return baseNameArr.slice(0, -1).join('.');
}