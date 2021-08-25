import * as assert from 'assert';
import * as vscode from 'vscode';
import { convertKanjiToHiragana, RecentKanjiConversionList, RecentKanaConversionList } from '../../extension';
import { __local__ as __extension } from '../../extension';
import { googleTransliterate } from '../../googletransliterate';
import { convertRomanToHiragana, isRoman } from '../../romanToHiragana';
import { __local__ as __roman_to_hiranaga } from '../../romanToHiragana';
import { hiraganaToKatakana, katakanaToHiragana } from '../../hiraganaKatakana';
import { hankakuToZenkaku, zenkakuToHankaku } from '../../hankakuZenkaku';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('REGEX test', () => {
		let testString = 'aiuあaiu-e[]o.';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_ROMAN), 4);
		testString = 'aiuあa iu-e[]o.';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_ROMAN), 6);
		testString = 'aiuあaAiu-e[]o.';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_ROMAN), 5);
		testString = 'aiuあaiu-e[]o.あ';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_ROMAN), undefined);
		testString = 'ひらカタカナひらがな「」ー〜、。';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_HIRAGANA), 6);
		testString = 'カタひらがなカタカナ「」ー〜、。';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_KATAKANA), 6);
		testString = 'ＡＢaＡＢＣＤＥー～';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_KANJI), 3);
		testString = '漢字、漢字「」ー〜ああいうえおアイウエオＡＢＣＤＥ';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_KANJI), 3);
		testString = '漢字。漢字「」ー〜ああいうえおアイウエオＡＢＣＤＥ';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_KANJI), 3);
		testString = 'ab。!09azAZ[];~{}<>?,.';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_ASCII), 3);
		testString = 'ａｂ。！０９ａｚＡＺ［］；～｛｝？＜＞，．';
		assert.strictEqual(__extension.getLastWordCaracter(testString, __extension.REGEX_FULLWIDTH), 3);
	});


	test('roman test', () => {
		assert.strictEqual(convertRomanToHiragana('aiueo'), 'あいうえお');
		assert.strictEqual(convertRomanToHiragana('kakikukeko'), 'かきくけこ');
		assert.strictEqual(convertRomanToHiragana('cacicuceco'), 'かしくせこ');
		assert.strictEqual(convertRomanToHiragana('sasisuseso'), 'さしすせそ');
		assert.strictEqual(convertRomanToHiragana('tatituteto'), 'たちつてと');
		assert.strictEqual(convertRomanToHiragana('qaqiquqeqo'), 'くぁくぃくぅくぇくぉ');
		assert.strictEqual(convertRomanToHiragana('naninuneno'), 'なにぬねの');
		assert.strictEqual(convertRomanToHiragana('hahihuheho'), 'はひふへほ');
		assert.strictEqual(convertRomanToHiragana('mamimumemo'), 'まみむめも');
		assert.strictEqual(convertRomanToHiragana('yayiyuyeyo'), 'やいゆえよ');
		assert.strictEqual(convertRomanToHiragana('rarirurero'), 'らりるれろ');
		assert.strictEqual(convertRomanToHiragana('wawiwuwewo'), 'わゐうゑを');
		assert.strictEqual(convertRomanToHiragana('gagigugego'), 'がぎぐげご');
		assert.strictEqual(convertRomanToHiragana('zazizuzezo'), 'ざじずぜぞ');
		assert.strictEqual(convertRomanToHiragana('dadidudedo'), 'だぢづでど');
		assert.strictEqual(convertRomanToHiragana('babibubebo'), 'ばびぶべぼ');
		assert.strictEqual(convertRomanToHiragana('papipupepo'), 'ぱぴぷぺぽ');
		assert.strictEqual(convertRomanToHiragana('jajijujejo'), 'じゃじじゅじぇじょ');
		assert.strictEqual(convertRomanToHiragana('xaxixuxexo'), 'ぁぃぅぇぉ');
		assert.strictEqual(convertRomanToHiragana('lalilulelo'), 'ぁぃぅぇぉ');
		assert.strictEqual(convertRomanToHiragana('vavivuvevo'), 'ゔぁゔぃゔゔぇゔぉ');
		assert.strictEqual(convertRomanToHiragana('fafifufefo'), 'ふぁふぃふふぇふぉ');
		assert.strictEqual(convertRomanToHiragana('nn'), 'ん');
		assert.strictEqual(convertRomanToHiragana('zhzjzkzl'), '←↓↑→');
		assert.strictEqual(convertRomanToHiragana('zs'), '　');

		assert.strictEqual(convertRomanToHiragana('kyakyikyukyekyo'), 'きゃきぃきゅきぇきょ');
		assert.strictEqual(convertRomanToHiragana('syasyisyusyesyo'), 'しゃしぃしゅしぇしょ');
		assert.strictEqual(convertRomanToHiragana('shashishushesho'), 'しゃししゅしぇしょ');
		assert.strictEqual(convertRomanToHiragana('tyatyityutyetyo'), 'ちゃちぃちゅちぇちょ');
		assert.strictEqual(convertRomanToHiragana('thathithuthetho'), 'てゃてぃてゅてぇてょ');
		assert.strictEqual(convertRomanToHiragana('tsatsitsutsetso'), 'つぁつぃつつぇつぉ');
		assert.strictEqual(convertRomanToHiragana('cyacyicyucyecyo'), 'ちゃちぃちゅちぇちょ');
		assert.strictEqual(convertRomanToHiragana('chachichuchecho'), 'ちゃちちゅちぇちょ');
		assert.strictEqual(convertRomanToHiragana('nyanyinyunyenyo'), 'にゃにぃにゅにぇにょ');
		assert.strictEqual(convertRomanToHiragana('hyahyihyuhyehyo'), 'ひゃひぃひゅひぇひょ');
		assert.strictEqual(convertRomanToHiragana('myamyimyumyemyo'), 'みゃみぃみゅみぇみょ');
		assert.strictEqual(convertRomanToHiragana('ryaryiryuryeryo'), 'りゃりぃりゅりぇりょ');
		assert.strictEqual(convertRomanToHiragana('gyagyigyugyegyo'), 'ぎゃぎぃぎゅぎぇぎょ');
		assert.strictEqual(convertRomanToHiragana('zyazyizyuzyezyo'), 'じゃじぃじゅじぇじょ');
		assert.strictEqual(convertRomanToHiragana('dyadyidyudyedyo'), 'ぢゃぢぃぢゅぢぇぢょ');
		assert.strictEqual(convertRomanToHiragana('dhidhudhe'), 'でぃでゅでぇ');
		assert.strictEqual(convertRomanToHiragana('byabyibyubyebyo'), 'びゃびぃびゅびぇびょ');
		assert.strictEqual(convertRomanToHiragana('pyapyipyupyepyo'), 'ぴゃぴぃぴゅぴぇぴょ');
		assert.strictEqual(convertRomanToHiragana('xtuxyaxyuxyoxwa'), 'っゃゅょゎ');
		assert.strictEqual(convertRomanToHiragana('ltulyalyulyolwa'), 'っゃゅょゎ');
		assert.strictEqual(convertRomanToHiragana('xtsultsu'), 'っっ');
	});

	test('normarize_lowercase test', () => {
		assert.strictEqual(__roman_to_hiranaga.normalize_lowercase('UpperCase_to_lowerCase/E'), 'uppercase_to_lowercase/e');
	});
	test('normarize_n test', () => {
		assert.strictEqual(__roman_to_hiranaga.normalize_n('abbappun'), 'abbappun;');
		assert.strictEqual(__roman_to_hiranaga.normalize_n('wannauto'), 'wan;auto');
	});
	test('normarize_xtu test', () => {
		assert.strictEqual(__roman_to_hiranaga.normalize_xtu('abbappu'), 'axtubaxtupu');
	});

	test('roman normarize test', () => {
		assert.strictEqual(convertRomanToHiragana('HonjitsuhaSeitennnari'), 'ほんじつはせいてんなり');
		assert.strictEqual(convertRomanToHiragana('toukyoutokkyokyokakyoku'), 'とうきょうとっきょきょかきょく');
		assert.strictEqual(convertRomanToHiragana('pannnakotta'), 'ぱんなこった');
		assert.strictEqual(convertRomanToHiragana('pan;nakotta'), 'ぱんなこった');
		assert.strictEqual(convertRomanToHiragana('kyattihure-zu'), 'きゃっちふれーず');
		assert.strictEqual(convertRomanToHiragana('kyattifure-zu'), 'きゃっちふれーず');
		assert.strictEqual(convertRomanToHiragana('wain'), 'わいん');
		assert.strictEqual(convertRomanToHiragana('sinsain'), 'しんさいん');
		assert.strictEqual(convertRomanToHiragana('batta-sansinnwannnauto'), 'ばったーさんしんわんなうと');
		assert.strictEqual(convertRomanToHiragana('batta-sansinnwannauto'), 'ばったーさんしんわんあうと');
		assert.strictEqual(convertRomanToHiragana('batta-sansin;wan;auto'), 'ばったーさんしんわんあうと');
	});

	test('roman number test', () => {
		assert.strictEqual(convertRomanToHiragana('0123456789'), '０１２３４５６７８９');
	});

	test('roman signal test', () => {
		// assert.strictEqual(convertRomanToHira('!@#$%^&*()_+={}[]:";\'<>?/\\|~`'), '！＠＃＄％＾＆＊（）＿＋＝｛｝［］：”；’＜＞？／￥｜〜｀');
		assert.strictEqual(convertRomanToHiragana('!@#$%^&*()_+={}[]:"\'<>?/\\|~`'), '！＠＃＄％＾＆＊（）＿＋＝｛｝「」：”’＜＞？・￥｜〜｀');
		assert.strictEqual(convertRomanToHiragana(',.'), '、。');
	});

	test('roman isRoman test', () => {
		assert.strictEqual(isRoman('aiueo'), true);
		assert.strictEqual(isRoman('!@#$%^&*()_+={}[]:"\'<>?/\\|~`'), true);
		assert.strictEqual(isRoman('漢字'), false);
		assert.strictEqual(isRoman('ひらがな'), false);
		assert.strictEqual(isRoman('カタカナ'), false);
		assert.strictEqual(isRoman('ＡＢＣＤＥ'), false);
	});

	test('google transliterate test', async () => {
		// テストするときのみコメントアウトする
		return;
		assert.deepStrictEqual(await googleTransliterate('ほんじつは'), [
			{
				candidates: ['本日は', '本実は', '本ジツは', '本地搗は'],
				kana: 'ほんじつは'
			}
		]);
		assert.deepStrictEqual(await googleTransliterate('ここではきものをぬぐ'), [
			{
				candidates: ["個々では", "此処では"],
				kana: 'ここでは'
			},
			{
				candidates: ["着物を", "被物を", "木物を"],
				kana: 'きものを'
			},
			{
				candidates: ["脱ぐ", "拭", "揩"],
				kana: 'ぬぐ'
			},
		]);
	});

	test('findRecentKanji test', () => {
		const recent1: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
			{ kanji: "今日は", kanjiReversed: "は日今", converted: { kana: "きょうは", candidates: ["今日は"] } },
			{ kanji: "良い漢字", kanjiReversed: "字漢い良", converted: { kana: "よいかんじ", candidates: ["良い漢字"] } },
		];

		assert.deepStrictEqual(__extension.findKanjiRecent('今日は', recent1), { index: 0, recentConversion: recent1[1] });
		assert.deepStrictEqual(__extension.findKanjiRecent('漢字', recent1), { index: 0, recentConversion: recent1[0] });
		assert.deepStrictEqual(__extension.findKanjiRecent('天気', recent1), { index: - 1, recentConversion: undefined });
		assert.deepStrictEqual(__extension.findKanjiRecent('今日は漢字あ', recent1), { index: 3, recentConversion: recent1[0] });
		assert.deepStrictEqual(__extension.findKanjiRecent('今日は漢字今日は', recent1), { index: 5, recentConversion: recent1[1] });
		assert.deepStrictEqual(__extension.findKanjiRecent('今日は良い漢字', recent1), { index: 3, recentConversion: recent1[2] });
		assert.deepStrictEqual(__extension.findKanjiRecent('今日は漢字', recent1), { index: 3, recentConversion: recent1[0] });

		const recent2: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
		];

		assert.deepStrictEqual(__extension.findKanjiRecent('天気', recent1), { index: - 1, recentConversion: undefined });
		assert.deepStrictEqual(__extension.findKanjiRecent('漢字', recent1), { index: 0, recentConversion: recent1[0] });
		assert.deepStrictEqual(__extension.findKanjiRecent('今日の漢字', recent1), { index: 3, recentConversion: recent1[0] });

		const recent3: RecentKanjiConversionList = [];
		assert.deepStrictEqual(__extension.findKanjiRecent('天気', recent1), { index: - 1, recentConversion: undefined });
	});

	test('KanjiToHiragana test', () => {
		const recent1: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
			{ kanji: "今日は", kanjiReversed: "は日今", converted: { kana: "きょうは", candidates: ["今日は"] } },
		];

		assert.strictEqual(convertKanjiToHiragana('今日は', recent1), recent1[1].converted);
		assert.strictEqual(convertKanjiToHiragana('漢字', recent1), recent1[0].converted);
		assert.strictEqual(convertKanjiToHiragana('天気', recent1), null);
	});
	test('getRomanWordRange test', () => {
		const recent1: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
			{ kanji: "今日は", kanjiReversed: "は日今", converted: { kana: "きょうは", candidates: ["今日は"] } },
		];

		assert.deepStrictEqual(__extension.getRomanWordRange('あいうabcde'),
			3);
		assert.deepStrictEqual(__extension.getRomanWordRange('あいうabcdeあ'),
			undefined);
	});
	test('getHiraganaWordRange test', () => {
		const recent1: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
		];

		assert.deepStrictEqual(__extension.getHiraganaWordRange('abcdeあいう'),
			5);
		assert.deepStrictEqual(__extension.getHiraganaWordRange('あいうabcde'),
			undefined);
	});
	test('getKatakanaWordRange test', () => {
		const recent1: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
		];

		assert.deepStrictEqual(__extension.getKatakanaWordRange('abcdeアイウ'),
			5);
		assert.deepStrictEqual(__extension.getKatakanaWordRange('あいうabcdeあ'),
			undefined);
	});
	test('getKanjiWordRange test', () => {
		const recent1: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
			{ kanji: "今日は", kanjiReversed: "は日今", converted: { kana: "きょうは", candidates: ["今日は"] } },
		];

		assert.deepStrictEqual(__extension.getKanjiWordRange('あいうabc漢字de', new vscode.Range(10, 5, 10, 15), recent1),
			new vscode.Range(10, 11, 10, 13));
	});

	test('pushRecentKanji test', () => {
		const recent1: RecentKanjiConversionList = [
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
			{ kanji: "今日は", kanjiReversed: "は日今", converted: { kana: "きょうは", candidates: ["今日は"] } },
		];

		assert.deepStrictEqual(__extension.pushRecentKanji("今日は", { kana: "きょうは", candidates: ["今日は"] }, recent1), [
			{ kanji: "今日は", kanjiReversed: "は日今", converted: { kana: "きょうは", candidates: ["今日は"] } },
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
		]);
		// ※テスト実行でrecent1が変化する
		assert.deepStrictEqual(__extension.pushRecentKanji("今日", { kana: "きょう", candidates: ["今日"] }, recent1), [
			{ kanji: "今日", kanjiReversed: "日今", converted: { kana: "きょう", candidates: ["今日"] } },
			{ kanji: "今日は", kanjiReversed: "は日今", converted: { kana: "きょうは", candidates: ["今日は"] } },
			{ kanji: "漢字", kanjiReversed: "字漢", converted: { kana: "かんじ", candidates: ["漢字"] } },
		]);
	});

	test('pushRecentKana test', () => {
		const recent1: RecentKanaConversionList = [
			{ kana: "かんじ", kanji: "漢字", converted: { kana: "かんじ", candidates: ["漢字"] } },
			{ kana: "きょうは", kanji: "今日は", converted: { kana: "きょうは", candidates: ["今日は"] } },
		];

		assert.deepStrictEqual(__extension.pushRecentKana("きょうは", "京は", { kana: "きょうは", candidates: ["京は", "今日は"] }, recent1), [
			{ kana: "きょうは", kanji: "京は", converted: { kana: "きょうは", candidates: ["京は", "今日は"] } },
			{ kana: "かんじ", kanji: "漢字", converted: { kana: "かんじ", candidates: ["漢字"] } },
		]);
		// ※テスト実行でrecent1が変化する
		assert.deepStrictEqual(__extension.pushRecentKana("きょう", "今日", { kana: "きょう", candidates: ["今日"] }, recent1), [
			{ kana: "きょう", kanji: "今日", converted: { kana: "きょう", candidates: ["今日"] } },
			{ kana: "きょうは", kanji: "京は", converted: { kana: "きょうは", candidates: ["京は", "今日は"] } },
			{ kana: "かんじ", kanji: "漢字", converted: { kana: "かんじ", candidates: ["漢字"] } },
		]);
	});

	test('getNextKanji test', () => {
		const converted = { kana: "きょうは", candidates: ["京は", "強は", "今日は"] }

		assert.deepStrictEqual(__extension.getNextKanji("きょうは", "京は", converted), "強は");
		assert.deepStrictEqual(__extension.getNextKanji("きょうは", "今日は", converted), "京は");
	});

	test('getPrevKanji test', () => {
		const converted = { kana: "きょうは", candidates: ["京は", "強は", "今日は"] }

		assert.deepStrictEqual(__extension.getPrevKanji("きょうは", "強は", converted), "京は");
		assert.deepStrictEqual(__extension.getPrevKanji("きょうは", "京は", converted), "今日は");
	});

	test('hiraganaKatakana test', () => {
		assert.strictEqual(hiraganaToKatakana("あぁゔゎんを"), "アァヴヮンヲ");
		assert.strictEqual(katakanaToHiragana("アァヴヮンヲ"), "あぁゔゎんを");
	});

	test('hankakuZenkaku test', () => {
		assert.strictEqual(hankakuToZenkaku("ab。!09azAZ[];~{}<>?,."), "ａｂ。！０９ａｚＡＺ［］；～｛｝＜＞？，．");
		assert.strictEqual(zenkakuToHankaku("ａｂ。！０９ａｚＡＺ［］；～｛｝＜＞？，．"), "ab。!09azAZ[];~{}<>?,.");
	});
});
