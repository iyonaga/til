
```
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

(found in <Root>)
```

というエラー。

公式ドキュメントの通り、webpackの設定で
```
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
```
としたら解決した。

---

### 単一ファイルコンポーネント

### webpackに.vue用の設定を加える
vue-loaderとvue-template-compilerをインストール
あとは公式通りに設定
https://vue-loader.vuejs.org/guide/#manual-configuration


---
## vue用のeslint設定
eslint-plugin-vueを入れる
https://qiita.com/taiju59/items/326bb25814f60ecf9c3c

.eslintrc.json
```
"extends": [
  "eslint:recommended",
  "plugin:vue/recommended",
  "plugin:prettier/recommended"
],
```

package.json
```
"scripts": {
  "lint:js": "eslint --ext .js,.jsx,.vue src --format codeframe",
  "lint:fix": "eslint --ext .js,.jsx,.vue src --format codeframe --fix",
  "format:js": "prettier-eslint --write src/js/**/*.{js,vue}",
  "format:scss": "prettier-stylelint --quiet --write src/scss/**/*.scss"
},
"lint-staged": {
  "*.{js,vue}": [
    "eslint"
  ]
},
```




### `error: Use the latest vue-eslint-parser`
https://github.com/vuejs/eslint-plugin-vue


### atomで.vueファイルの自動整形が動かない
linter-eslintの設定を変更する必要がある
https://github.com/vuejs/eslint-plugin-vue#why-doesnt-it-work-on-vue-file
https://qiita.com/taiju59/items/326bb25814f60ecf9c3c#linter-eslint

Preference(⌘,) -> Packages -> linter-eslint
List of scopes to run ESLint on, ... に「text.html.vue」を追記

これだけでは動かなかったがatomにlanguage-vueを入れたら動いた
