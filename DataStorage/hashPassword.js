import * as bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPasswordWithSalt = await bcrypt.hash(password, salt)
    return { salt, hashedPasswordWithSalt }
}

export const checkPassword = async (notEncryptedPassword, encryptedPasswordWithSalt) => {
    const result = await bcrypt.compare(notEncryptedPassword, encryptedPasswordWithSalt)
    return result
}
