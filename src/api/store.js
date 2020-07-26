import {get, post} from "../utils/request"


export function receiveStoreData(queryParam) {
    return post("/store/all", queryParam)
}

export function runSqlById(id) {
    return get("/execute/run-sql-by-store-id/" + id)
}

export function receiveDataBaseProfile() {
    return get("/store/profile-list");
}

export function createStore({profileId, executeSql}){
    return post("/store", {
        profileId, executeSql
    })
}

export function createStoreList({profileId, executeSql}){
    return post("/store/list", {
        profileId, executeSql
    })
}