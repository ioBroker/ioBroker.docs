---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adaptersecurity.md
title: 适配器开发人员的安全相关功能
hash: 5yeiL/Kr0swPAF0K9PHmK2EFYsp6ACRLgh4MZOmurRk=
---
# 适配器开发人员的安全相关功能
## 防止其他适配器访问敏感数据
如果您需要存储用户密码或用于授予用户访问您所提供服务的令牌，那么为了用户的利益，防止外部适配器访问这些信息可能至关重要。

为此，您可以在 `io-package.json` 文件中添加一个名为 `protectedNative` 的字段。该字段必须包含一个数组，其中包含存储在受保护适配器的 `native` 属性中的所有属性。

请注意，适配器 `admin`、`cloud` 和 `iot` 始终拥有对受保护属性的访问权限。`admin` 需要此访问权限，以便用户能够在适配器自身的配置页面中读取属性，并在 `system.adapter.<namespace>.<instance>` 中手动编辑受保护字段。

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

自动加密和解密敏感数据
如果您需要存储用户密码或用于访问您所提供服务的令牌，那么为了用户的利益，避免以明文形式存储这些敏感信息可能更为重要。

为此，您可以在 `io-package.json` 文件中添加一个名为 `encryptedNative` 的字段。该字段必须包含一个数组，其中包含适配器 `native` 属性中存储的所有属性。这些属性将以加密形式存储，并在适配器运行时自动解密。

当当前使用的加密算法变得不安全时，js-controller 中会对其进行更改。

当前使用的加密算法

- js-controller >= 3.0: `default`
- js-controller >= 3.2: `aes-192-cbc`

请注意，此功能至少需要 js-controller 3.0.0 版本。

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

手动加密和解密敏感数据
我们还提供了适配器方法，方便您在代码中手动加密数据。

您可以使用 ``adapter.encrypt`` 和 ``adapter.decrypt`` 方法。用于加密和解密的密钥是用户安装的系统级唯一密钥。如果您想使用自己的密钥，请将其作为**第一个**参数传递，并将密钥值作为第二个参数传递：``encrypt(key, value)`` / ``decrypt(key, value)``。密钥是一个 192 位（24 字节）的密钥，以十六进制字符串的形式给出。

__例子__：

```javascript
// encrypt data using users unique secret
const encryptedContent = adapter.encrypt('super secret message');

const decryptedContent = adapter.decrypt(encryptedContent);
// decryptedContent === 'super secret message'

// Or use your own 192 bit (24 byte) key, given as a hex string
const crypto = require('crypto');
const key = crypto.randomBytes(24).toString('hex');
const encryptedWithOwnKey = adapter.encrypt(key, 'super secret message');
const decryptedWithOwnKey = adapter.decrypt(key, encryptedWithOwnKey);
// decryptedWithOwnKey === 'super secret message'
```