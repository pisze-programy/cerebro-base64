export default class Base64 {
  static buffer (from, to) {
    return Buffer.from(...from).toString(to);
  }

  static trim (string) {
    return string.trim();
  }

  encode (string) {
    console.log(this.constructor.trim(string));

    return this.constructor.buffer([this.constructor.trim(string)], 'base64');
  }

  decode (base64) {
    console.log(this.constructor.trim(base64));

    return this.constructor.buffer([this.constructor.trim(base64), 'base64'], 'ascii');
  }
}
