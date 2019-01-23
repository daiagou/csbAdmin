import axios from 'axios';
import $ from "jquery";

import config from '../config/config';

// let base = 'http://115.29.191.31:9090/adsManagement';
let base = config.serviceUrl;

// axios.defaults.withCredentials = true


export const requestLogin = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/login`,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(params),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
    }).then(res => res);
};
export const uploadImg = (params,config) => { return axios.post(`${base}/csb/uploadImg`, params,config).then(res => res.data); };
export const saveOrUpdateGoods = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/csb/saveOrUpdateGoods`,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(params),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
    }).then(res => res);
};
export const saveGoods = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/csb/saveGoods`,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(params),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
    }).then(res => res);
};
export const updateGoods = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/csb/updateGoods`,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(params),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
    }).then(res => res);
};
export const queryGoodsInfo = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/csb/queryGoodsInfo`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
export const queryGoodsInfosLike = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/csb/queryGoodsInfosLike`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
export const deleteGoods = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/csb/deleteGoods`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};



export const updateOrder = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/csb/updateOrder`,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(params),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
    }).then(res => res);
};
export const queryOrders = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/csb/queryOrders`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
export const queryOrdersLike = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/csb/queryOrdersLike`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
export const queryOrderAndInfosByOrderNo = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/csb/queryOrderAndInfosByOrderNo`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
export const queryOrderInfos = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/csb/queryOrderInfos`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};







export const getLoginCode = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/getLoginCode`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};

// export const getLoginCode = params => { return axios.post(`${base}/getLoginCode`, params).then(res => res.data); };
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };



export const queryRetailOrders = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/retail/queryRetailOrders`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
export const queryRetailOrdersNoOrder = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/retail/queryRetailOrdersNoOrder`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
export const queryRetailOrdersByEnterTime = params => {
    return $.ajax({
        type: 'get',
        url: `${base}/retail/queryRetailOrdersByEnterTime`,
        data: params,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        crossDomain: true
    }).then(res => res);
};
// export const queryOrders = params => {
//     return $.ajax({
//         type: 'get',
//         url: `${base}/retail/queryOrders`,
//         data: params,
//         xhrFields: {
//             withCredentials: true
//         },
//         dataType: 'json',
//         crossDomain: true
//     }).then(res => res);
// };
export const updateRetailOrderById = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/retail/updateRetailOrderById`,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(params),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
    }).then(res => res);
};
export const updateRetailOrderByIdNotSendSms = params => {
    return $.ajax({
        type: 'post',
        url: `${base}/retail/updateRetailOrderByIdNotSendSms`,
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(params),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
    }).then(res => res);
};





