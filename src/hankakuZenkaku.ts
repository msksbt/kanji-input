export const hankakuToZenkaku = (text: string): string => {
    return text.replace(/[!-~]/g, function (match) {
        var code = match.charCodeAt(0) + 0xFEE0;
        return String.fromCharCode(code);
    });
}

export const zenkakuToHankaku = (text: string): string => {
    return text.replace(/[！-\uFF5E]/g, function (match) {
        var code = match.charCodeAt(0) - 0xFEE0;
        return String.fromCharCode(code);
    });
}