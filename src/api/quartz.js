import {get, post, postForm, putForm} from "../utils/request"


export function createQuartz({jobName, jobGroup, cronExp}){
    return post("/quartz-mgr", {
        jobName, jobGroup, cronExp
    })
}

export function receiveJobData(queryParam) {
    return post("/quartz-mgr/all", queryParam)
}

export function startJob(id) {
    return get("/quartz-mgr/start/" + id + "/quartz")
}

export function runJob(id) {
    return get("/quartz-mgr/run/" + id + "/quartz")
}

export function deleteById({jobId}) {
    return post("/quartz-mgr/delete", {jobId})
}