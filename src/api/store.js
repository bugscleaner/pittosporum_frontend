import {get} from "../utils/request"


export function receiveStoreData() {
    return get("/store/all")
}

export function runSqlById(id) {
    return get("/execute/run-sql-by-store-id/" + id)
}

export function receiveDataBaseProfile() {
    return get("/store/profile-list");
}