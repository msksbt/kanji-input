import * as vscode from 'vscode';
import { googleTransliterate } from './googletransliterate';
import { hankakuToZenkaku, zenkakuToHankaku } from './hankakuZenkaku';
import { hiraganaToKatakana, katakanaToHiragana } from './hiraganaKatakana';
import { convertRomanToHiragana } from './romanToHiragana';

export const dd = (valiable: any) => {
	console.log(`kanji-input: debugLog vv`);
	console.log(valiable);
	console.log(`kanji-input: debugLog ^^`);
}

export const debugLog = (message: string | undefined) => {
	console.log(`kanji-input: ${message}`);
}

export interface KanjiConverted {
	kana: string,
	candidates: string[],
};
export type KanjiConvertedList = KanjiConverted[];

export interface RecentKanjiConversion {
	kanji: string,
	kanjiReversed: string,
	converted: KanjiConverted,
};
export type RecentKanjiConversionList = RecentKanjiConversion[];

export interface RecentKanaConversion {
	kana: string,
	kanji: string,
	converted: KanjiConverted,
};
export type RecentKanaConversionList = RecentKanaConversion[];

export const chooseNextCandidate = (kanjiConverted: KanjiConverted, recentConversions: RecentKanjiConversionList, lastKanji: string | undefined): string => {

	return "";

}

export const convertKanjiToHiragana = (kanji: string, recentConversions: RecentKanjiConversionList): KanjiConverted | null => {

	const found = recentConversions.find(element => element.kanji === kanji);

	if (found) {
		return found.converted;
	}

	return null;
}

const BUFFER_COUNT_KANA = 1000;
const BUFFER_COUNT_KANJI = 1000;

type FoundRecentKanji = {
	index: number;
	recentConversion: RecentKanjiConversion | undefined;
};

const findKanjiRecent = (text: string, recentConversions: RecentKanjiConversionList): FoundRecentKanji => {
	if (recentConversions.length < 1) {
		return { index: -1, recentConversion: undefined };
	}
	if (recentConversions.length < 2) {
		return { index: 0, recentConversion: recentConversions[0] };
	}

	const textReversed = text.split('').reverse().join('');
	const result = recentConversions.map((value) => {
		const index = textReversed.indexOf(value.kanjiReversed);
		if (index < 0) {
			return { index: Number.MAX_SAFE_INTEGER, recentConversion: undefined };
		}
		return { index: index, recentConversion: value };
	}).reduce((a, b) => (a.index < b.index) ? a : b);

	if (result.recentConversion === undefined) {
		return { index: -1, recentConversion: undefined };
	}

	return { index: text.length - result.index - result.recentConversion.kanji.length, recentConversion: result.recentConversion };
}

const findIndexRecentKanji = (kanji: string, recentKanjiConversions: RecentKanjiConversionList): number => {
	return recentKanjiConversions.findIndex((recentKanjiConversion) => {
		if (recentKanjiConversion.kanji === kanji) {
			return true;
		}
	});
}

const pushRecentKanji = (kanji: string, kanjiConverted: KanjiConverted, recentKanjiConversionList: RecentKanjiConversionList): RecentKanjiConversionList => {
	const found = findIndexRecentKanji(kanji, recentKanjiConversionList);

	if (found >= 0) {
		recentKanjiConversionList.splice(found, 1);
	}

	recentKanjiConversionList.unshift({
		kanji: kanji,
		kanjiReversed: kanji.split('').reverse().join(''),
		converted: kanjiConverted,
	});

	recentKanjiConversionList.splice(BUFFER_COUNT_KANJI);

	return recentKanjiConversionList;
}

const findIndexRecentKana = (kana: string, recentKanaConversions: RecentKanaConversionList): number => {
	return recentKanaConversions.findIndex((recentKanaConversion) => {
		if (recentKanaConversion.kana === kana) {
			return true;
		}
	});
}

const pushRecentKana = (kana: string, kanji: string, kanjiConverted: KanjiConverted, recentKanaConversionList: RecentKanaConversionList): RecentKanaConversionList => {
	const found = findIndexRecentKana(kana, recentKanaConversionList);

	if (found >= 0) {
		recentKanaConversionList.splice(found, 1);
	}

	recentKanaConversionList.unshift({
		kana: kana,
		kanji: kanji,
		converted: kanjiConverted,
	});

	recentKanaConversionList.splice(BUFFER_COUNT_KANA);

	return recentKanaConversionList;
}

const getNextKanji = (kana: string, prevKanji: string, kanjiConverted: KanjiConverted): string => {
	const prevIndex = kanjiConverted.candidates.indexOf(prevKanji);

	return kanjiConverted.candidates[(prevIndex + 1) % kanjiConverted.candidates.length];
}

const getPrevKanji = (kana: string, prevKanji: string, kanjiConverted: KanjiConverted): string => {
	const prevIndex = kanjiConverted.candidates.indexOf(prevKanji);

	return kanjiConverted.candidates[(prevIndex + kanjiConverted.candidates.length - 1) % kanjiConverted.candidates.length];
}

const REGEX_ROMAN = / ?[a-zA-Z0-9,\.\-~[\];\/]+$/;
const REGEX_ASCII = /[!-~]+$/;
const REGEX_FULLWIDTH = /[！-\uFF5E]+$/;
const REGEX_HIRAGANA = /[\u3040-\u309F「」ー〜、。]+$/;
const REGEX_KATAKANA = /[\u30A0-\u30FF「」ー〜、。]+$/;
const REGEX_KANJI = /[^\x01-\x7E、。]+$/;

type getWordRangeFunction = (text: string) => number | undefined;

const getLastWordCaracter = (text: string, regExp: RegExp): number | undefined => {
	const match = text.match(regExp);

	return match?.index;
}

const addPosition = (position: vscode.Position, character: number): vscode.Position => {
	return new vscode.Position(position.line, position.character + character);
}

const getRomanWordRange: getWordRangeFunction = (text: string) => {
	return getLastWordCaracter(text, REGEX_ROMAN);
}

const getASCIIWordRange: getWordRangeFunction = (text: string) => {
	return getLastWordCaracter(text, REGEX_ASCII);
}

const getFullWidthWordRange: getWordRangeFunction = (text: string) => {
	return getLastWordCaracter(text, REGEX_FULLWIDTH);
}

const getHiraganaWordRange: getWordRangeFunction = (text: string) => {
	return getLastWordCaracter(text, REGEX_HIRAGANA);
}

const getKatakanaWordRange: getWordRangeFunction = (text: string) => {
	return getLastWordCaracter(text, REGEX_KATAKANA);
}

const replaceText = (editor: vscode.TextEditor, replaceRange: vscode.Range, replaced: string) => {
	editor.edit(function (editBuilder) {
		editBuilder.replace(replaceRange, replaced);
	}).then(success => {
		const position = new vscode.Position(replaceRange.start.line, replaceRange.start.character + replaced.length);
		editor.selection = new vscode.Selection(position, position);
	});
}

interface ReplaceText {
	range: vscode.Range,
	replaced: string
};
type ReplaceTexts = ReplaceText[];

const replaceTextMulti = (editor: vscode.TextEditor, replaces: ReplaceTexts) => {
	if (replaces.length <= 0) {
		return;
	}
	editor.edit(function (editBuilder) {
		replaces.forEach((replaced) => {
			editBuilder.replace(replaced.range, replaced.replaced);
		});
	}).then(success => {
		const selections: vscode.Selection[] = [];
		replaces.forEach((replaced) => {
			const position = new vscode.Position(replaced.range.start.line, replaced.range.start.character + replaced.replaced.length);
			selections.push(new vscode.Selection(position, position));
		});
		editor.selections = selections;
	});
}

const normarizeRange = (editor: vscode.TextEditor, range: vscode.Range, func: getWordRangeFunction): vscode.Range | null => {
	let selectedRange = range;
	if (range.start.isEqual(range.end)) {
		selectedRange = new vscode.Range(range.start.line, 0, range.end.line, range.end.character);
		const text = editor.document.getText(selectedRange);

		const found = func(text);
		if (found === undefined) {
			return null;
		}
		const newStart = addPosition(selectedRange.start, found)
		return new vscode.Range(newStart, selectedRange.end);
	}

	return range;
}

const getKanjiWordRange = (text: string, range: vscode.Range, recentConversions: RecentKanjiConversionList) => {
	const found = findKanjiRecent(text, recentConversions);
	if (found.recentConversion === undefined) {
		return undefined;
	}

	const startCaracter = range.start.character + found.index;

	return new vscode.Range(range.end.line, startCaracter, range.end.line, startCaracter + found.recentConversion.kanji.length);
}

const normarizeKanjiRange = (editor: vscode.TextEditor, range: vscode.Range, recentConversions: RecentKanjiConversionList): vscode.Range | null => {
	let selectedRange = range;
	if (range.start.isEqual(range.end)) {
		selectedRange = new vscode.Range(range.start.line, 0, range.end.line, range.end.character);
	}
	const text = editor.document.getText(selectedRange);

	const wordRange = getKanjiWordRange(text, selectedRange, recentConversions);
	if (wordRange === undefined) {
		return null;
	}
	return wordRange;
}

export function activate(context: vscode.ExtensionContext) {
	const recentKanjiConversions: RecentKanjiConversionList = [];
	const recentKanaConversions: RecentKanaConversionList = [];

	const transliterateKanji = async (hiragana: string): Promise<string> => {

		const kanaIndex = findIndexRecentKana(hiragana, recentKanaConversions);

		if (kanaIndex >= 0) {
			const conversion = recentKanaConversions[kanaIndex];
			const kanji = conversion.kanji;
			pushRecentKana(hiragana, kanji, conversion.converted, recentKanaConversions);
			if (kanji !== undefined) {
				pushRecentKanji(kanji, conversion.converted, recentKanjiConversions);
				return kanji;
			}
			return conversion.kana;
		}

		const kanjiConverted: KanjiConvertedList = await googleTransliterate(hiragana);

		let kanjiString = '';

		kanjiConverted.forEach((element) => {
			const kanji = element.candidates[0];

			pushRecentKana(element.kana, kanji, element, recentKanaConversions);
			if (kanji !== undefined) {
				pushRecentKanji(kanji, element, recentKanjiConversions);
			}
		});

		kanjiConverted.forEach((element) => {
			const kanji = element.candidates[0];
			if (kanji !== undefined) {
				kanjiString += kanji;
			} else {
				kanjiString += element.kana;
			}
		});
		return kanjiString;
	}

	const disposableToKanji = vscode.commands.registerCommand('kanji-input.convertToKanji', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selections = editor.selections;

		const replaceTextsAndUndefinded = await Promise.all(selections.map(async (selection): Promise<ReplaceText | undefined> => {
			let range: vscode.Range | null;
			range = normarizeRange(editor, selection, getRomanWordRange);
			if (range !== null) {
				const text = editor.document.getText(range);
				const hiragana = convertRomanToHiragana(text).trim();

				let kanjiString = await transliterateKanji(hiragana);

				return { range: range, replaced: kanjiString };
			}

			// conver to next Kanji.
			range = normarizeKanjiRange(editor, selection, recentKanjiConversions);
			if (range !== null) {
				const text = editor.document.getText(range);
				const converted = convertKanjiToHiragana(text, recentKanjiConversions);
				if (converted === null) {
					return;
				}

				const kanji = getNextKanji(converted.kana, text, converted);

				pushRecentKana(converted.kana, kanji, converted, recentKanaConversions);
				pushRecentKanji(kanji, converted, recentKanjiConversions);

				return { range: range, replaced: kanji };
			}
			range = normarizeRange(editor, selection, getHiraganaWordRange);
			if (range !== null) {
				const hiragana = editor.document.getText(range);

				let kanjiString = await transliterateKanji(hiragana);

				return { range: range, replaced: kanjiString };
			}
			range = normarizeRange(editor, selection, getKatakanaWordRange);
			if (range !== null) {
				const katakana = editor.document.getText(range);
				const hiragana = katakanaToHiragana(katakana);

				let kanjiString = await transliterateKanji(hiragana);

				return { range: range, replaced: kanjiString };
			}

		}));
		const replaces: ReplaceTexts = replaceTextsAndUndefinded.filter((value): value is Exclude<typeof value, undefined> => value !== undefined)
		replaceTextMulti(editor, replaces);
	});
	context.subscriptions.push(disposableToKanji);

	const disposableToKanjiPrev = vscode.commands.registerCommand('kanji-input.convertToKanjiPrev', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selections = editor.selections;

		const replaces: ReplaceTexts = selections.map((selection): ReplaceText | undefined => {
			let range: vscode.Range | null;
			// conver to previous Kanji.
			range = normarizeKanjiRange(editor, selection, recentKanjiConversions);
			if (range !== null) {
				const text = editor.document.getText(range);
				const converted = convertKanjiToHiragana(text, recentKanjiConversions);
				if (converted === null) {
					return;
				}

				const kanji = getPrevKanji(converted.kana, text, converted);

				pushRecentKana(converted.kana, kanji, converted, recentKanaConversions);
				pushRecentKanji(kanji, converted, recentKanjiConversions);

				return { range: range, replaced: kanji };
			}
		}).filter((value): value is Exclude<typeof value, undefined> => value !== undefined)
		replaceTextMulti(editor, replaces);
	});
	context.subscriptions.push(disposableToKanjiPrev);

	const disposableToHiragana = vscode.commands.registerCommand('kanji-input.convertToHiragana', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selections = editor.selections;

		const replaces: ReplaceTexts = selections.map((selection): ReplaceText | undefined => {
			let range: vscode.Range | null;
			range = normarizeRange(editor, selection, getRomanWordRange);
			if (range !== null) {
				const text = editor.document.getText(range);
				const hiragana = convertRomanToHiragana(text).trim();
				return { range: range, replaced: hiragana };
			}
			range = normarizeRange(editor, selection, getKatakanaWordRange);
			if (range !== null) {
				const katakana = editor.document.getText(range);
				const hiragana = katakanaToHiragana(katakana);
				return { range: range, replaced: hiragana };
			}
		}).filter((value): value is Exclude<typeof value, undefined> => value !== undefined)
		replaceTextMulti(editor, replaces);
	});

	context.subscriptions.push(disposableToHiragana);
	const disposableToKatakana = vscode.commands.registerCommand('kanji-input.convertToKatakana', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selections = editor.selections;

		const replaces: ReplaceTexts = selections.map((selection): ReplaceText | undefined => {
			let range: vscode.Range | null;
			range = normarizeRange(editor, selection, getRomanWordRange);
			if (range !== null) {
				const text = editor.document.getText(range);
				const hiragana = convertRomanToHiragana(text).trim();
				const katakana = hiraganaToKatakana(hiragana);
				return { range: range, replaced: katakana };
			}
			range = normarizeRange(editor, selection, getHiraganaWordRange);
			if (range !== null) {
				const hiragana = editor.document.getText(range);
				const katakana = hiraganaToKatakana(hiragana);
				return { range: range, replaced: katakana };
			}
		}).filter((value): value is Exclude<typeof value, undefined> => value !== undefined)
		replaceTextMulti(editor, replaces);
	});
	context.subscriptions.push(disposableToKatakana);

	const disposableToHalfWidth = vscode.commands.registerCommand('kanji-input.convertToHalfWidth', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selections = editor.selections;

		const replaces: ReplaceTexts = selections.map((selection): ReplaceText | undefined => {
			let range: vscode.Range | null;
			range = normarizeRange(editor, selection, getFullWidthWordRange)
			if (range !== null) {
				const text = editor.document.getText(range);
				const hankaku = zenkakuToHankaku(text);
				return { range: range, replaced: hankaku };
			}
		}).filter((value): value is Exclude<typeof value, undefined> => value !== undefined)
		replaceTextMulti(editor, replaces);
	});
	context.subscriptions.push(disposableToHalfWidth);

	const disposableToFullWidth = vscode.commands.registerCommand('kanji-input.convertToFullWidth', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		const selections = editor.selections;

		const replaces: ReplaceTexts = selections.map((selection): ReplaceText | undefined => {
			let range: vscode.Range | null;
			range = normarizeRange(editor, selection, getASCIIWordRange);
			if (range !== null) {
				const text = editor.document.getText(range);
				const zenkaku = hankakuToZenkaku(text);
				return { range: range, replaced: zenkaku };
			}
		}).filter((value): value is Exclude<typeof value, undefined> => value !== undefined)
		replaceTextMulti(editor, replaces);
	});
	context.subscriptions.push(disposableToFullWidth);

}

// this method is called when your extension is deactivated
export function deactivate() { }

export const __local__ = {
	getLastWordCaracter, getRomanWordRange, getHiraganaWordRange, getKatakanaWordRange, getKanjiWordRange,
	REGEX_ROMAN, REGEX_ASCII, REGEX_FULLWIDTH, REGEX_HIRAGANA, REGEX_KATAKANA, REGEX_KANJI,
	findKanjiRecent, pushRecentKana, pushRecentKanji, getNextKanji, getPrevKanji
}
