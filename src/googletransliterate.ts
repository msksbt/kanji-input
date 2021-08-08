import fetch from 'node-fetch';
import { KanjiConverted, KanjiConvertedList } from "./extension";

const REGEX_HIRAKANA = /^[\u3040-\u309F\u30A0-\u30FF「」ー〜、。]+$/;
const REGEX_HALF = /[!-~ｦ-ﾝ]/;

const callTransliterate = async (hiragana: string): Promise<Array<[string, string[]]>> => {
    const utf8encoded = encodeURIComponent(hiragana);

    const response = await fetch(`http://www.google.com/transliterate?langpair=ja-Hira|ja&text=${utf8encoded}`);
    //TODO エラー処理

    let converted: KanjiConverted[] = new Array<KanjiConverted>()
    const response_json: Array<[string, string[]]> = await response.json();
    return response_json;
}

export const googleTransliterate = async (hiragana: string): Promise<KanjiConvertedList> => {
    let converted: KanjiConverted[] = new Array<KanjiConverted>()

    const response_json = await callTransliterate(hiragana);

    response_json.forEach((element) => {
        const kanji: string[] = element[1];

        const kanji_filtered = kanji.filter((value) => {
            return !REGEX_HIRAKANA.test(value);
        }).filter((value) => {
            return !REGEX_HALF.test(value);
        });

        converted.push({
            kana: element[0],
            candidates: kanji_filtered,
        });
    });

    return converted;
}
