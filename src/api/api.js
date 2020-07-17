
import Router from '../router'
const PASSWORD_ERROR = "B0006";
axios.defaults.baseURL = "/api/";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const postSubmit = (url, data)=>{
    return new Promise((res, rej)=>{
        axios({
            url,
            method: "post",
            data,
        }).then(res => {
            let responseData = res.data;
            let hasError = responseData.hasError;
            if (hasError == true){
                rej(responseData)


            }else {
                res(responseData)
            }
        })
    })
}
