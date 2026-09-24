export function generateCode() {
  const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const arr = new Uint8Array(6);
  crypto.getRandomValues(arr);
   let code = "";
  arr.forEach(n => {
    code += CHARS[n%52]
  })
  return code;
}
