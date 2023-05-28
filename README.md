# Ionic-TechSpace

## Comandos
Debug and Testing
```bash
ionic serve 
```
Build
```bash
ionic build
```
Adiconar Android Platform
```bash
ionic cap add android
```
Abrir o projeto
```bash
ionic cap open android
```
Iniciar a App
```bash
ionic can run android
```
Sync APP com o Projeto
```bash
ionic cap sync android
```

## Icon / Splash Screen
Criar uma pasta `resources` e outra `android` dentro de "resouces", colocar o icon e a splas na pasta "resouces" e dentro da pasta "android" os backgrounds.
Instalar Plugin
```bash
npm i cordova-res
```
Sync APP com o Projeto
```bash
ionic cap sync android
```
Correr o comando
```bash
npx cordova-res
```
Gerar
```bash
npx cordova-res android --skip-config --copy
```

## Importante
Adiconar ao ficheiro "android\gradle.properties"
`android.overridePathCheck=true`