function createGetParam(param) {
    return Object.keys(param).flatMap(k => createGetParamImpl(`${k}`,param[k])).join('&');
}
function createGetParamImpl(parent,param) {
    if(Array.isArray(param))
    {
        return param.flatMap(p => createGetParam(`${parent}[]`,parent));
    }
    if(typeof param === 'object') return Object.keys(param).flatMap(k => createGetParam(`${parent}[${k}]`,param[k]));
    return `${parent}=${param}`;
}
export async function requestResources(method,url,param = {}){
    let response = null;
    if(method == 'GET')
    {
        const paramStr = createGetParam(param);
        response = await (await fetch(encodeURI(paramStr ? `${url}?${paramStr}` : `${url}`))).blob();
    } else {
        response = await (await fetch(`${url}`,{
            method : method,
            body : JSON.stringify(param)
        })).blob();
    }
    if(response.type.match('text/.*'))
        return await response.text();
    else if(response.type.match('application/json'))
        return JSON.parse(await response.text());
    else
        return response;
}