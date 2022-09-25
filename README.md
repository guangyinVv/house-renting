## 好客租房移动 web

### vscode 配置

```
{
  "editor.unicodeHighlight.nonBasicASCII": false,
  "editor.mouseWheelZoom": true,
  "path-autocomplete.excludedItems": {},
  "path-autocomplete.extensionOnImport": true,
  "path-autocomplete.pathMappings": {
    "@": "${folder}/src"
  },
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "emmet.triggerExpansionOnTab": true,
  "emmet.showSuggestionsAsSnippets": true,
  // Eslint插件的配置
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  // Prettier
  "prettier.configPath": "C:\\Users\\2899173331\\.prettierrc",
  "eslint.alwaysShowStatus": true,
  "prettier.trailingComma": "none",
  "prettier.semi": false,
  // 每行文字个数超出此限制将会被迫换行
  "prettier.printWidth": 300,
  // 使用单引号替换双引号
  "prettier.singleQuote": true,
  "prettier.arrowParens": "avoid",
  // 设置 .vue 文件中，HTML代码的格式化插件
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.ignoreProjectWarning": true,
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": false
    },
    "prettier": {
      "printWidth": 300,
      "trailingComma": "none",
      "semi": false,
      "singleQuote": true,
      "arrowParens": "avoid"
    }
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "workbench.editor.splitInGroupLayout": "vertical",
  "vetur.validation.template": false,
  "terminal.integrated.persistentSessionReviveProcess": "never",
  "px-to-vw.viewportWidth": 360,
  "liveServer.settings.donotShowInfoMsg": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
