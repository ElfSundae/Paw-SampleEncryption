
function randomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

var SampleEncryption = function () {
  this.evaluate = function(context) {
    var result = '';

    var random = randomString(this.text.length);
    var temp = '';
    for (var i = 0; i < this.text.length; i++) {
      temp += random.charAt(i) + String.fromCharCode(random.charCodeAt(i) ^ this.text.charCodeAt(i));
    }

    for (var i = 0; i < temp.length; i++) {
      result += String.fromCharCode(temp.charCodeAt(i) ^ this.key.charCodeAt(i%this.key.length));
    }

    // https://luckymarmot.com/zh-hans/paw/doc/dynamic-values/encoding_crypto
    var base64 = (new DynamicValue('com.luckymarmot.Base64EncodingDynamicValue', {
      'input': result,
      'mode': 0 /* Encode */
    })).getEvaluatedString();

    result = base64.replace(/=/g, '');

    return result;
  }
}

SampleEncryption.identifier = "com.0x123.SampleEncryption"
SampleEncryption.title = "Sample Encryption"
SampleEncryption.help = "https://github.com/ElfSundae/SampleEncryption"
SampleEncryption.inputs = [
  DynamicValueInput("text", "Text", "String", {
    persisted: false,
    placeholder: "Type the text to be encrypted"
  }),
  DynamicValueInput("key", "Key", "String", {
    persisted: true,
    placeholder: "Type the key"
  })
]

registerDynamicValueClass(SampleEncryption);
