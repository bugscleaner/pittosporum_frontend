import {get} from "../utils/request"


export function receiveStoreData() {
    return get("/store/all")
}