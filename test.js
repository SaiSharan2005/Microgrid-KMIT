const { Buffer } = require("buffer");
const CryptoJS= require("crypto-js");
const encryptionKey =
  "00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF";

// Ensure the key is 32 bytes long
if (Buffer.from(encryptionKey, "hex").length !== 32) {
  console.error("Invalid key length. Please use a 32-byte key for AES-256.");
  process.exit(1); // Exit the program due to an error
}

function encryptAES(text) {
  const encrypted = CryptoJS.AES.encrypt(text, encryptionKey).toString();
  return encrypted;
}
function decryptAES(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, encryptionKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

// while(1){
  console.log(encryptAES(0) )
console.log(decryptAES("U2FsdGVkX18/HdzLycwfMmUpDGWVf/A33sReJDYE0v8="));