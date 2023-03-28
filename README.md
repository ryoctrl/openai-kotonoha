## OpenAI Kotonoha

### Reference

↓ これを目指したい*(:3」∠)*↓

#### [レトロゲーム ゆっくり実況&ボイスロイド実況ちゃんねる](https://www.youtube.com/@VOICEROID_)

### How to start

1. Node.js がインストールされていること

ない場合は以下からインストール

- [Node.js](https://nodejs.org/ja)

yarn も同時にインストール

```
$ exec $SHELL -l
$ npm i -g yarn
```

2. 本リポジトリが Clone されていること

3. OpenAI Api Key の設定ができていること

- `.env.sample` を `.env` としてコピー
- `.env` の `OPENAI_API_KEY='sk-...'` の部分を実際の値に書き換え
- direnv が入ってなかったら入れる

```
$ brew install direnv
$ echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
$ exec $SHELL -l
$ direnv allow
```

3. 起動コマンド

```
$ yarn install
$ yarn start
```
