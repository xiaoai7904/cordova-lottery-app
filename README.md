# Quasar App (cordova-exchange-app)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).

#### 浏览器调试

chrome://inspect

#### 打包命令

"build:android": "cd ./src-cordova && cordova build android --keystore=my-release-key.keystore --alias=apk --storePassword=xiaoai123 --password=xiaoai123"

"zipalign": "zipalign -f -v 4 ./src-cordova/platforms/android/app/release/app-release.apk ./src-cordova/platforms/android/app/release/app-release-align.apk",

"apksinger": "apksigner sign --ks my-release-key.keystore --ks-key-alias apk --v1-signing-enabled true --v2-signing-enabled true ./src-cordova/platforms/android/app/release/app-release-align.apk",

#### 插件

"cordova-android": "^12.0.0",
"cordova-clipboard": "^1.3.0",
"cordova-plugin-android-permissions": "^1.1.5",
"cordova-plugin-apkupdater": "^4.0.3",
"cordova-plugin-file": "^8.0.0",
"cordova-plugin-filepath": "^1.6.0",
"cordova-plugin-inappbrowser": "^5.0.0",
"cordova-plugin-sms": "^1.0.5",
"cordova-plugin-splashscreen": "^6.0.1",
"cordova-plugin-statusbar": "^3.0.0"

#### google 浏览器调试

chrome://inspect

#### Android APK 手动打包流程

Android app 的打包流程大致分为 build , sign , align 三部分。
build 是构建 APK 的过程，分为 debug 和 release 两种。
sign 是为 APK 签名。
align 是压缩和优化的步骤，优化后会减少 app 运行时的内存开销。

#### 自定义打包名称

applicationVariants.all { variant ->
variant.outputs.all { output ->
if (variant.buildType.name.equals('release')) {
outputFileName = "eed*release*${variant.versionName}\_unsigned.apk"
}
}
}

applicationVariants.all { variant ->
variant.outputs.all { output ->
def outputFile = output.outputFile
def fileName
if (outputFile != null && outputFile. name.endswith('.apk')) {
if (variant.buildType.name.equals('release')) {
fileName = "example*demo_v${\_versionName}*${buildTime()}.apk"
                } else if (variant.buildType.name.equals ('debug')) {
                    fileName = "example_debug_v${_versionName}_${buildTime()}.apk"
}
outputFileName = fileName
}
}
}
