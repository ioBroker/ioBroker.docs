---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adaptersecurity.md
title: 适配器开发人员的安全相关功能
hash: X2HcDsT5TE/W4x20hMFpAqHF23iMYbOPyEK6TXNkyG4=
---
# 适配器开发人员的安全相关功能
## 防止其他适配器访问敏感数据
如果您需要存储用户密码或令牌，以便用户访问您提供的服务，那么外部适配器无法访问此信息可能符合用户的利益。
为此，您可以将字段`protectedNative`添加到您的`io-package.json`文件中。此字段必须包含存储在适配器的`native`属性中的所有属性的数组，这些属性将受到保护。

请注意，管理适配器将始终能够访问受保护的属性，以便用户能够读取适配器自己的配置页面中的属性，并手动编辑`system.adapter.<namepsace>.<instance>` 中的受保护字段。

__例子__：

```json
...
"protectedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## 自动加密和解密敏感数据
如果您需要存储用户密码或令牌，以便用户访问您提供的服务，那么为了用户的利益，最好不要以明文形式存储这些敏感信息。
为此，您可以在 `io-package.json` 文件中添加一个字段 `encryptedNative`。此字段必须包含存储在适配器的 `native` 属性中的所有属性的数组，这些属性将以加密形式存储，并在适配器运行时自动解密。

每当当前使用的加密算法变得不安全时，它将在 js-controller 中发生变化。

__当前使用的加密算法__

- js-controller >= 3.0: `默认`
- js-控制器 >= 3.2: `aes-192-cbc`

请注意，此功能至少需要 js-controller 3.0.0。

__例子__：

```json
...
"encryptedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## 手动加密和解密敏感数据
我们还提供适配器方法，用于在代码中手动加密数据。
为此，您可以使用`adapter.encrypt`和`adapter.decrypt`方法。用于加密和解密的密钥是用户安装的系统范围唯一密钥。如果您想使用自己的密钥（192 位十六进制）进行加密，可以通过将第二个参数传递给`encrypt`和`decrypt`方法来实现。

__例子__：

```javascript
// encrypt data using users unique secret
const encryptedContent = adapter.encrypt('super secret message');

const decryptedContent = adapter.decrypt(encryptedContent);
// decryptedContent === 'super secret message'

// Or use your own key (24 byte Hex) for encryption
const crypto = require('crypto');
const key = crypto.randomBytes(24).toString('hex');
const encryptedContent = adapter.encrypt(key, 'super secret message');
const decryptedContent = adapter.decrypt(key, encryptedContent);
// decryptedContent === 'super secret message'
```