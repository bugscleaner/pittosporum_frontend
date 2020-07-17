import {post} from "../utils/request"

export function login({userName, userPwd}){
    return post("/user-mgr/login", {
        userName, userPwd
    })
}