import { atom } from "recoil";

export const authState = atom({
    key: 'authState',
    default: sessionStorage.getItem('token')?.length !== undefined
})