export const katakanaToHiragana = (text: string): string => {
    return text.replace(/[\u30a1-\u30f6]/g, function (match) {
        var code = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(code);
    });
}

export const hiraganaToKatakana = (text: string): string => {
    return text.replace(/[\u3041-\u3096]/g, function (match) {
        var code = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(code);
    });
}