const {
  assert
} = require('chai');

const randomString = require('../helpers');

describe('randomString', function() {

  it('should return a string with six characters', function() {
      const randomStringLength = randomString().length;
      const expectedOutput = 6;
      assert.equal(randomStringLength, expectedOutput);
  });

  it('should not return the same string when called multiple times', function() {
      const firstRandomString = randomString();
      const secondRandomString = randomString();
      assert.notEqual(firstRandomString, secondRandomString);
  });
});