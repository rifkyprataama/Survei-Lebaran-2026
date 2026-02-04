import crypto from "crypto"

const ALGORITHM = "aes-256-cbc"
// Gunakan password database Anda sebagai 'kunci' sementara agar konsisten
// Di production nanti, ini sebaiknya masuk .env terpisah (SECRET_KEY)
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(process.env.DATABASE_URL || "kunci-rahasia-default")
  .digest("base64")
  .substring(0, 32)

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  // Simpan IV di depan teks terenkripsi dipisah titik dua
  return iv.toString("hex") + ":" + encrypted.toString("hex")
}

export function decrypt(text: string): string {
  const textParts = text.split(":")
  const iv = Buffer.from(textParts.shift()!, "hex")
  const encryptedText = Buffer.from(textParts.join(":"), "hex")
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}