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

選択範囲がない場合は、カーソル直前の単語を変換対象とします。

漢字、ひらがな、カタカナへの変換時、先頭に半角のスペースがある場合、削除されます。

これは、アルファベットのあとに続けて日本語を入力した場合に区切り文字として使用するためです。

アルファベットの後に、空白を開けたい場合は、スペースを２文字入力して変換すると、意図した変換結果になります。

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
