interface RomajiTable {
    nofc: number,
    table: {
        [key: string]: string,
    }
};


const romajiTable: RomajiTable[] = [
    {
        nofc: 1,
        table: {
            'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
            '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
            '-': 'ー', '!': '！', '@': '＠', '#': '＃', '$': '＄',
            '%': '％', '^': '＾', '&': '＆', '*': '＊', '(': '（', ')': '）',
            '_': '＿', '+': '＋', '=': '＝', '{': '｛', '}': '｝', '[': '「', ']': '」',
            ':': '：', '\\': '￥', '|': '｜', '~': '〜', '`': '｀',
            '<': '＜', '>': '＞', '"': '”', '\'': '’', '/': '・', '?': '？',
            ',': '、', '.': '。',
        }
    },
    {
        nofc: 2,
        table: {
            'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
            'ca': 'か', 'ci': 'し', 'cu': 'く', 'ce': 'せ', 'co': 'こ',
            'qa': 'くぁ', 'qi': 'くぃ', 'qu': 'くぅ', 'qe': 'くぇ', 'qo': 'くぉ',
            'sa': 'さ', 'si': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
            'ta': 'た', 'ti': 'ち', 'tu': 'つ', 'te': 'て', 'to': 'と',
            'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
            'ha': 'は', 'hi': 'ひ', 'hu': 'ふ', 'he': 'へ', 'ho': 'ほ',
            'fa': 'ふぁ', 'fi': 'ふぃ', 'fu': 'ふ', 'fe': 'ふぇ', 'fo': 'ふぉ',
            'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
            'ya': 'や', 'yi': 'い', 'yu': 'ゆ', 'ye': 'え', 'yo': 'よ',
            'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
            'wa': 'わ', 'wi': 'ゐ', 'wu': 'う', 'we': 'ゑ', 'wo': 'を',
            'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
            'za': 'ざ', 'zi': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
            'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
            'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
            'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
            'ja': 'じゃ', 'ji': 'じ', 'ju': 'じゅ', 'je': 'じぇ', 'jo': 'じょ',
            'xa': 'ぁ', 'xi': 'ぃ', 'xu': 'ぅ', 'xe': 'ぇ', 'xo': 'ぉ',
            'la': 'ぁ', 'li': 'ぃ', 'lu': 'ぅ', 'le': 'ぇ', 'lo': 'ぉ',
            'va': 'ゔぁ', 'vi': 'ゔぃ', 'vu': 'ゔ', 've': 'ゔぇ', 'vo': 'ゔぉ',
            'n;': 'ん',
            'z,': '‥', 'z.': '…', 'z/': '・',
            'zh': '←', 'zj': '↓', 'zk': '↑', 'zl': '→',
            'zs': '　',
            'z(': '【', 'z)': '】',
            'z[': '『', 'z]': '』',
        }
    },
    {
        nofc: 2,
        table: {
            'nn': 'ん'
        }
    },
    {
        nofc: 3,
        table: {
            'kya': 'きゃ', 'kyi': 'きぃ', 'kyu': 'きゅ', 'kye': 'きぇ', 'kyo': 'きょ',
            'sya': 'しゃ', 'syi': 'しぃ', 'syu': 'しゅ', 'sye': 'しぇ', 'syo': 'しょ',
            'tya': 'ちゃ', 'tyi': 'ちぃ', 'tyu': 'ちゅ', 'tye': 'ちぇ', 'tyo': 'ちょ',
            'tha': 'てゃ', 'thi': 'てぃ', 'thu': 'てゅ', 'the': 'てぇ', 'tho': 'てょ',
            'tsa': 'つぁ', 'tsi': 'つぃ', 'tsu': 'つ', 'tse': 'つぇ', 'tso': 'つぉ',
            'cya': 'ちゃ', 'cyi': 'ちぃ', 'cyu': 'ちゅ', 'cye': 'ちぇ', 'cyo': 'ちょ',
            'cha': 'ちゃ', 'chi': 'ち', 'chu': 'ちゅ', 'che': 'ちぇ', 'cho': 'ちょ',
            'nya': 'にゃ', 'nyi': 'にぃ', 'nyu': 'にゅ', 'nye': 'にぇ', 'nyo': 'にょ',
            'hya': 'ひゃ', 'hyi': 'ひぃ', 'hyu': 'ひゅ', 'hye': 'ひぇ', 'hyo': 'ひょ',
            'mya': 'みゃ', 'myi': 'みぃ', 'myu': 'みゅ', 'mye': 'みぇ', 'myo': 'みょ',
            'yya': 'いゃ', 'yyi': 'いぃ', 'yyu': 'いゅ', 'yye': 'いぇ', 'yyo': 'いょ',
            'rya': 'りゃ', 'ryi': 'りぃ', 'ryu': 'りゅ', 'rye': 'りぇ', 'ryo': 'りょ',
            'wya': 'ゐゃ', 'wyi': 'ゐぃ', 'wyu': 'ゐゅ', 'wye': 'ゐぇ', 'wyo': 'ゐょ',
            'gya': 'ぎゃ', 'gyi': 'ぎぃ', 'gyu': 'ぎゅ', 'gye': 'ぎぇ', 'gyo': 'ぎょ',
            'zya': 'じゃ', 'zyi': 'じぃ', 'zyu': 'じゅ', 'zye': 'じぇ', 'zyo': 'じょ',
            'dya': 'ぢゃ', 'dyi': 'ぢぃ', 'dyu': 'ぢゅ', 'dye': 'ぢぇ', 'dyo': 'ぢょ',
            'dhi': 'でぃ', 'dhu': 'でゅ', 'dhe': 'でぇ',
            'bya': 'びゃ', 'byi': 'びぃ', 'byu': 'びゅ', 'bye': 'びぇ', 'byo': 'びょ',
            'pya': 'ぴゃ', 'pyi': 'ぴぃ', 'pyu': 'ぴゅ', 'pye': 'ぴぇ', 'pyo': 'ぴょ',
            'sha': 'しゃ', 'shi': 'し', 'shu': 'しゅ', 'she': 'しぇ', 'sho': 'しょ',
            'whi': 'うぃ', 'whe': 'うぇ', 'who': 'うぉ',
            'jya': 'じゃ', 'jyi': 'じぃ', 'jyu': 'じゅ', 'jye': 'じぇ', 'jyo': 'じょ',
            'xtu': 'っ', 'xya': 'ゃ', 'xyu': 'ゅ', 'xyo': 'ょ', 'xwa': 'ゎ',
            'ltu': 'っ', 'lya': 'ゃ', 'lyu': 'ゅ', 'lyo': 'ょ', 'lwa': 'ゎ',
        }
    },
    {
        nofc: 4,
        table: {
            'xtsu': 'っ', 'ltsu': 'っ',
        }
    },
];

/**
 * 「大文字」の正規化
 * @param source string
 * @returns
 */
const normalize_lowercase = (source: string): string => {
    return source.toLowerCase();
}
/**
 * 「ん」の正規化
 * @param source string
 * @returns
 */
const normalize_n = (source: string): string => {
    let normalized = source;
    normalized = normalized.replace(/nn/ig, 'n;');
    normalized = normalized.replace(/n$/ig, 'n;');
    // normalized = normalized.replace(/nn(?![aiueoy])/ig, 'n;');
    normalized = normalized.replace(/n[^aiueoy;]/ig, (match) => {
        return 'n;' + match.substring(1);
    });

    return normalized;
}

/**
 * 促音の正規化
 * @param source string
 * @returns
 */
const normalize_xtu = (source: string): string => {
    return source.replace(/(kk)|(ss)|(tt)|(hh)|(mm)|(yy)|(rr)|(ww)|(gg)|(zz)|(dd)|(bb)|(xx)|(cc)|(ff)|(vv)|(pp)|(jj)/ig, (match) => {
        return 'xtu' + match.substring(1);
    });
}


export const convertRomanToHiragana = (roman: string): string => {
    let i = 0;
    let hiragana_string = '';

    const normalized = normalize_xtu(normalize_n(normalize_lowercase(roman)));

    while (i < normalized.length) {
        const isRomaji = romajiTable.some(element => {
            const nofc = element.nofc;
            const char = normalized.substr(i, nofc);

            const hira = element.table[char];

            if (hira !== undefined) {
                i += nofc;
                hiragana_string += hira;
                return true;
            }
        });
        if (!isRomaji) {
            hiragana_string += normalized.substr(i, 1);
            i += 1;
        }
    }

    return hiragana_string;
}

export const isRoman = (sample: string): boolean => {
    const regex = /[_\-;:!?."\(\)[\]\{}@*\/\\&#%`\^+<=>|~$0-9a-z]+/i;

    return regex.test(sample);
}

export const __local__ = { normalize_lowercase, normalize_n, normalize_xtu };