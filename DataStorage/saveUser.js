import { getStoragePath, USERS } from "./dataStorageNames";
import { add } from './dbInterface';
import { hashPassword } from './hashPassword';
import { getUserByLogin }  from './utils';

export const rejesterUser = async ({ name, nickName, password }) => {
    try {
        const path = getStoragePath(USERS);
        const { hashedPasswordWithSalt } = await hashPassword(password)
        const user = { name, login: nickName, password: hashedPasswordWithSalt }
        const userWithTheSameLogin = await getUserByLogin(nickName)
        if (userWithTheSameLogin !== undefined) {
            return {
                result: false,
                message: `Login ${nickName} already taken`
            }
        }
        await add(path, user)
        return { result: true }    
    } catch(e) {
        console.error('Failed to save user')
        console.log(e)
        return { result: false, message: 'Something went wrong' }
    }
}
