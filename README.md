# kanji-input README

## 機能 Features

Convert roman to Japanese Kanji.
Visual Studio Code Extension.

VisualStudioCodeの拡張機能です。

ローマ字から、日本語、漢字への変換を行います。

コーディング時の煩わしいIMEの切り替えが不要となります。

## Visual Studio Extention Page

https://marketplace.visualstudio.com/items?itemName=mskjp.kanji-input

## 使い方 Usage

![使い方](image/kanji-input-usage.gif "usage")

ローマ字で文字を入力し、以下のコマンドまたは、ショートカットキーで漢字やひらがなに変換します。

選択範囲がある場合は、選択範囲を変換の対象とします。

選択範囲がない場合は、カーソル直前の文節を変換対象とします。
概ねアルファベットが続く場合に文節として認識しますが、アルファベット大文字が有る場合はそこまでを、単語として認識します。
これは、アルファベットのあとに続けて日本語を入力した場合に区切り文字として使用するためです。

### 漢字への変換

```json
"command": "kanji-input.convertToKanji",
"title": "Kanji Input:Convert to Kanji"
```

ローマ字、ひらがな、カタカナを漢字変換します。

一度変換した漢字を対象として、このコマンドを実行した場合、次の候補への変換を行います。

変換した漢字を対象とする場合、カーソル直前ではなく、カーソル前の文字列で、変換結果に該当する部分が、変換対象となります。

漢字変換には、`Google CGI API for Japanese Input` を使用しています。

https://www.google.co.jp/ime/cgiapi.html

```json
"command": "kanji-input.convertToKanjiPrev",
"title": "Kanji Input:Convert to Kanji previous"
```

漢字変換後、このコマンドで前の候補への変換を行います。

### ひらがな、カタカナへの変換

```json
"command": "kanji-input.convertToHiragana",
"title": "Kanji Input:Convert to Hiragana"
```

```json
"command": "kanji-input.convertToKatakana",
"title": "Kanji Input:Convert to Katakana"
```

これらのコマンドで、ひらがな、カタカナへの変換を行います。
漢字変換後の文節についても、ひらがなへ変換できます。
(漢字からカタカナへの変換は実装していません。)

### 英全角、半角への変換

```json
"command": "kanji-input.convertToFullWidth",
"title": "Kanji Input:Convert to Zenkaku"
```

```json
"command": "kanji-input.convertToHalfWidth",
"title": "Kanji Input:Convert to Hankaku"
```

これらのコマンドで、英全角、半角への変換を行います。

## 初期設定では以下のショートカットキーが設定されます。

```json
        "keybindings": [
            {
                "command": "kanji-input.convertToKanji",
                "key": "shift+ctrl+j",
                "mac": "shift+ctrl+j",
                "when": "editorTextFocus && !editorReadonly"
            },
            {
                "command": "kanji-input.convertToKanjiPrev",
                "key": "shift+ctrl+p",
                "mac": "shift+ctrl+p",
                "when": "editorTextFocus && !editorReadonly"
            },
            {
                "command": "kanji-input.convertToHiragana",
                "key": "shift+ctrl+h",
                "mac": "shift+ctrl+h",
                "when": "editorTextFocus && !editorReadonly"
            },
            {
                "command": "kanji-input.convertToKatakana",
                "key": "shift+ctrl+k",
                "mac": "shift+ctrl+k",
                "when": "editorTextFocus && !editorReadonly"
            },
            {
                "command": "kanji-input.convertToFullWidth",
                "key": "shift+ctrl+l",
                "mac": "shift+ctrl+l",
                "when": "editorTextFocus && !editorReadonly"
            },
            {
                "command": "kanji-input.convertToHalfWidth",
                "key": "shift+ctrl+;",
                "mac": "shift+ctrl+;",
                "when": "editorTextFocus && !editorReadonly"
            }
        ]
```

## 注意事項

漢字変換には、`Google CGI API for Japanese Input` を使用しています。

https://www.google.co.jp/ime/cgiapi.html

変換対象の文字のインターネットへの情報送信が行われますので、ご注意ください。

なお、上記APIが使用されるのは、`kanji-input.convertToKanji` のみです。

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

alpha release of kanji-input

### 0.0.2 - 2021-08-10

#### Fixed

- 先頭の半角スペースを削除するように変更
- 変換結果に漢字候補が無い場合、エラーにならないように修正

### [0.0.3] - 2021-08-22

#### Fixed

- 編集対象がない時に、不必要にeditメソッドを実行しないように修正
- #4 変換後、長音記号が入っているひらがなのみの変換結果が候補に入ってしまっている を修正


### [0.1.0] - 2021-08-25

#### Changed

- `()` を日本語変換への対象から外す（カーソル直前の対象）
- `~`を日本語変換への対象にした（カーソル直前の対象）
- #3 漢字変換後、ひらがなへ戻せるように変更
- #5 次候補への変換時、より長い漢字文字列を優先して次の候補を取得する
- #9 カーソル前文字列の変換時に英大文字を区切りとして認識する
- 先頭の空白は対象にしないように変更

### Fixed

- 変換履歴が１件しか無い場合に、再変換、逆変換ができないのを修正
