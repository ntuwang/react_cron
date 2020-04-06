import cookie from 'react-cookies'

let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}


function getOptions(uri, callback) {

    fetch(uri, {
        method: 'GET',
        headers: headers,
        credentials: 'same-origin',
    })
        .then(res => {
            return res.json();
        })
        .then(propsData => {
            return callback(propsData.data.serviceId)
        })
        .catch(error => {
            console.error(error);
            // console.log(propsData.data)
        })
}

function _get(uri, params, callback) {
    let token = localStorage.getItem('token')

    if (token) {
        headers.Authorization = token
    }


    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (uri.search(/\?/) === -1) {
            uri += '?' + paramsArray.join('&')
        } else {
            uri += '&' + paramsArray.join('&')
        }
    }

    //fetch请求
    return fetch(uri, {
        method: 'GET',
        headers: headers,
        credentials: 'same-origin',

    })
        .then(rs => {
            return rs.json();
        })
        .then(data => {
            return callback(data);
        })
        .catch((error) => {
            console.error(error);
        })
}


function _post(uri, data, callback) {
    let token = localStorage.getItem('token')

    if (token) {
        headers.Authorization = token
    }


    //fetch请求
    return fetch(uri, {
        method: 'POST',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify(data)
    })
        .then(rs => {
            return rs.json();
        })
        .then(data => {
            return callback(data);
        })
        .catch((error) => {
            console.error(error);
        })
}

export {
    _get,
    getOptions,
    _post
}