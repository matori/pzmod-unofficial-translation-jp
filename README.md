# pzmod-unofficial-translation-jp

作業中です。ガイドラインに準じていない箇所も多々あります。

- [ガイドライン](./docs/ガイドライン.md) / 作業中
- [辞書](./dict) / 未整理
- [翻訳ファイル](./src/Contents/mods/UnofficialTranslationJP/media/lua/shared/Translate/JP) / 未完成

`<C>` `<L>` `<WBR>` などはビルド時に調整する、このビルドツール独自のタグです。そのままゲームには組み込めません。

## ビルド

Node.js >= 16.14.0

```shell
npm ci
```

```shell
npm run build
```

## 校正

textlintを使っています。

文のリント。

```shell
npm run lint:basic
```

単語レベルのリント。

```shell
npm run lint:prh
```

まとめて。

```shell
npm run lint
```
