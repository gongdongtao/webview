var Utils = {

	getDeviceType: function(type) {
    let label = 'Other';
    switch (type) {
      case 0:
        label = 'Router'
        break;
      case 1:
        label = 'Android';
        break;
      case 2:
        label = 'iOS';
        break;
      case 3:
        label = 'PC';
        break;
      case 4:
        label = 'MAC';
        break;
      case 5:
        label = 'Vrouter';
        break;
      case 6:
        label = 'Linux';
        break;
      case 7:
        label = 'Other';
        break;
      default:
        break;
    }
    return label;
  },
  guid: function() {
    var len = 32; //32长度
    var radix = 16; //16进制
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      var r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }
}

export default Utils;