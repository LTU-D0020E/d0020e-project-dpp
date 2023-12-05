import { hash, compare, genSalt } from 'bcrypt'

export async function hashPassword(plaintextPassword) {
  const saltRounds = 10 // Cost factor
  const hashedPassword = await new Promise((resolve, reject) => {
    genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err)
      }
      hash(plaintextPassword, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
  })
  return hashedPassword
}

export async function verifyPassword(plaintextPassword, hashedPassword) {
  const isValid = await new Promise((resolve, reject) => {
    compare(plaintextPassword, hashedPassword, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
  return isValid
}
