module.exports = {
  root: true, // この設定がプロジェクトのルートにあることを示す
  parser: "@typescript-eslint/parser", // TypeScriptコードを解析するために必須
  plugins: [
    "@typescript-eslint", // @typescript-eslintのルールを使えるようにする
    "import", // airbnb-baseが利用するため、'import' プラグインも追加
  ],
  env: {
    browser: true, // ブラウザのグローバル変数を有効化
    es2021: true, // ECMAScript 2021のグローバル変数を有効化
    node: true, // Node.js環境も使うなら追加
  },
  parserOptions: {
    ecmaVersion: "latest", // 最新のECMAScript機能（例: optional chaining）を解析可能にする
    sourceType: "module", // ES Modules (import/export) 構文の使用を許可
    // TypeScriptの型情報にアクセスするルール（例: recommended-requiring-type-checking）を使う場合、
    // ここでtsconfig.jsonへのパスを指定する必要があります。
    // プロジェクトのルートにtsconfig.jsonがあるなら './tsconfig.json' でOK。
    project: "./tsconfig.eslint.json", // tsconfig.jsonへの正しいパス
    tsconfigRootDir: __dirname, // VS CodeのESLint拡張機能にtsconfigのルートを教える場合に役立つ
  },
  ignorePatterns: ["dist", "*.js"], // コンパイルされたJSファイルやビルド出力は無視する
  extends: [
    // 1. 基本的なESLintの推奨ルール。
    //    これは @typescript-eslint/eslint-recommended の前に置く必要があります。
    "eslint:recommended",

    // 2. ESLintのコアルールをTypeScript版で無効化/上書きする設定。
    //    これが競合を防ぐために非常に重要です。
    "plugin:@typescript-eslint/eslint-recommended", // 競合するESLintコアルールを無効化

    // 3. TypeScriptの基本的な推奨ルール。
    "plugin:@typescript-eslint/recommended", // 基本的な推奨TypeScriptルール
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // 型チェックが必要なより厳密なルール

    // 4. スタイルに関するTypeScriptルール。
    //    ★★★ここが、あなたがリストアップした多くの「Definition for rule... not found」エラーに対する重要な修正点です。★★★
    //    quotes, indentなどのスタイルの@typescript-eslint版のルールを有効にします。
    "plugin:@typescript-eslint/stylistic",

    // 5. AirbnbのJavaScript基本ルール。
    //    これらは上記の一部の一般的なルールを上書きします。
    "airbnb-base",

    // 6. AirbnbのTypeScript固有ルール。
    //    これらは上記の構成の上に適用されます。
    "airbnb-typescript/base",

    // 7. もしPrettierを使っているなら、ESLintのスタイルルールとPrettierが競合しないように、これらを最後に含めます。
    // 'prettier', // ESLintをFormatterとして使う場合
    // 'plugin:prettier/recommended', // Prettierと競合するESLintルールを無効化
  ],
  rules: {
    // カスタムルールまたはAirbnb/TypeScriptルールの上書き

    // Airbnbのデフォルトエクスポート強制を無効化
    "import/prefer-default-export": "off",

    // ★★★ここから、あなたがエラーとしてリストアップした個々のルールに対する具体的な解決策です。★★★
    // ESLintのコアルールを明示的に無効にし、@typescript-eslint版のルールを有効にします。

    // クォーテーションスタイル
    "quotes": "off", // ESLintコアのquotesルールを無効化
    "@typescript-eslint/quotes": ["error", "double", { "allowTemplateLiterals": true }], // @typescript-eslint版を有効化（ダブルクォーテーション、テンプレートリテラルを許可）

    // 波括弧のスタイル
    "brace-style": "off", // ESLintコアのbrace-styleルールを無効化
    "@typescript-eslint/brace-style": ["error", "1tbs"], // @typescript-eslint版を有効化（1tbsスタイル）

    // 末尾のコンマ
    "comma-dangle": "off", // ESLintコアのcomma-dangleルールを無効化
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"], // @typescript-eslint版を有効化（複数行の場合に末尾のコンマを強制）

    // コンマの後のスペース
    "comma-spacing": "off", // ESLintコアのcomma-spacingルールを無効化
    "@typescript-eslint/comma-spacing": ["error", { "before": false, "after": true }], // @typescript-eslint版を有効化（コンマの前にスペースなし、後にスペースあり）

    // 関数呼び出しのスペース
    "func-call-spacing": "off", // ESLintコアのfunc-call-spacingルールを無効化
    "@typescript-eslint/func-call-spacing": ["error", "never"], // @typescript-eslint版を有効化（関数名と括弧の間にスペースなし）

    // インデント
    "indent": "off", // ESLintコアのindentルールを無効化
    "@typescript-eslint/indent": ["error", 2], // @typescript-eslint版を有効化（2スペースインデント）

    // キーワードのスペース
    "keyword-spacing": "off", // ESLintコアのkeyword-spacingルールを無効化
    "@typescript-eslint/keyword-spacing": ["error", { "before": true, "after": true }], // @typescript-eslint版を有効化（キーワードの前後にスペースあり）

    // クラスメンバー間の空行
    "lines-between-class-members": "off", // ESLintコアのlines-between-class-membersルールを無効化
    "@typescript-eslint/lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }], // @typescript-eslint版を有効化（常に空行を入れるが、単一行メンバーの後は除く）

    // 余分なセミコロン
    "no-extra-semi": "off", // ESLintコアのno-extra-semiルールを無効化
    "@typescript-eslint/no-extra-semi": "error", // @typescript-eslint版を有効化

    // throwリテラル（エラーオブジェクト以外をthrowしない）
    "no-throw-literal": "off", // ESLintコアのno-throw-literalルールを無効化
    "@typescript-eslint/no-throw-literal": "error", // @typescript-eslint版を有効化

    // セミコロンの有無
    "semi": "off", // ESLintコアのsemiルールを無効化
    "@typescript-eslint/semi": ["error", "always"], // @typescript-eslint版を有効化（常にセミコロンを強制）

    // ブロック前のスペース
    "space-before-blocks": "off", // ESLintコアのspace-before-blocksルールを無効化
    "@typescript-eslint/space-before-blocks": ["error", "always"], // @typescript-eslint版を有効化（ブロック前にスペースを強制）

    // 関数括弧前のスペース
    "space-before-function-paren": "off", // ESLintコアのspace-before-function-parenルールを無効化
    "@typescript-eslint/space-before-function-paren": ["error", {
      "anonymous": "always", // 匿名関数（例: `function() {}`）は括弧前にスペースあり
      "named": "never",    // 名前付き関数（例: `function funcName() {}`）は括弧前にスペースなし
      "asyncArrow": "always" // 非同期アロー関数（例: `async () => {}`）は括弧前にスペースあり
    }], // @typescript-eslint版を有効化

    // 演算子間のスペース
    "space-infix-ops": "off", // ESLintコアのspace-infix-opsルールを無効化
    "@typescript-eslint/space-infix-ops": "error", // @typescript-eslint版を有効化

    // オブジェクトの波括弧内のスペース
    "object-curly-spacing": "off", // ESLintコアのobject-curly-spacingルールを無効化
    "@typescript-eslint/object-curly-spacing": ["error", "always"] // @typescript-eslint版を有効化（波括弧内にスペースを強制）
  },
};