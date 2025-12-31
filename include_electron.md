- criar uma pasta na raiz chamado electron
- criar um arquivo chamado mais.js
- copiar o código no link https://www.electronjs.org/docs/latest/
- instalar o electron
```
npm install --save-dev electron
```
- copiar esse comandos para os scripts
```
    "electron": "electron .",
    "build:electron": "ng build --base-href ./ && electron .",
    "electron:serve": "concurrently \"ng serve\" \"wait-on http://localhost:4200 && electron .\"",
    "electron:build": "ng build --base-href ./ && electron-builder",
    "package": "electron-builder"
```


npm install concurrently wait-on --save-dev

npm install electron-builder --save-dev