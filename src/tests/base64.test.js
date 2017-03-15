import expect from 'expect';
import Base64 from '../base64';

describe('Base64 tests', () => {
  it('Base64 Encode method should return decoded buffer', () => {
    const payload = "it's working";

    expect(new Base64().encode(payload)).toEqual("aXQncyB3b3JraW5n");
  });

  it('Base64 Decode method should return encoded buffer', () => {
    const payload = "aXQncyB3b3JraW5n";

    expect(new Base64().decode(payload)).toEqual("it's working");
  });

  it('Base64 static trim should trim spaces before', () => {
    const payload = " it's working";

    expect(new Base64().constructor.trim(payload)).toEqual("it's working");
  });

  it('Base64 static trim should trim spaces after', () => {
    const payload = "it's working ";

    expect(new Base64().constructor.trim(payload)).toEqual("it's working");
  });

  it('Base64 static buffer should return decoded buffer with space', () => {
    const payload = "it's working ";

    expect(new Base64().constructor.buffer([payload], "base64")).toEqual("aXQncyB3b3JraW5nIA==");
  });

  it('Base64 static buffer should return encoded buffer with space', () => {
    const payload = "aXQncyB3b3JraW5nIA==";

    expect(new Base64().constructor.buffer([payload, "base64"], 'ascii')).toEqual("it's working ");
  });

  it('Base64 static buffer should return decoded buffer with space', () => {
    const payload = "it's working";

    expect(new Base64().constructor.buffer([payload], "base64")).toEqual("aXQncyB3b3JraW5n");
  });

  it('Base64 static buffer should return encoded buffer without space', () => {
    const payload = "aXQncyB3b3JraW5n";

    expect(new Base64().constructor.buffer([payload, "base64"], 'ascii')).toEqual("it's working");
  });
});
