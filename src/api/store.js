import {get, post, put} from "../utils/request"


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

export function updateStore(entity){
    return put("/store", entity)
}

export function deleteStoreById(entity){
    return put("/store/delete", entity)
}

export function createStoreList({profileId, executeSql}){
    return post("/store/list", {
        profileId, executeSql
    })
}