const bcrypt = require('bcrypt');
const saltRounds = 10;


export const HashPass = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        throw new Error('Error hashing password');
    }
}
export const ComparePass = async (password: string, hash: string) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw new Error('Error comparing password');
    }
}