import { get } from './dbInterface.js';
import { getStoragePath, USERS } from './dataStorageNames.js'

export const getUserByLogin = async (login) => 
    get(getStoragePath(USERS), (content) => 
            content.find((user) => user.login === login))
