import fetch from 'node-fetch';
import UserAgent from 'user-agents';
import cookie from 'cookie';

const fetchCookie = () => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        fetch('https://vinted.fr', {
            signal: controller.signal
        }).then((res) => {
            const sessionCookie = res.headers.get('set-cookie');
            controller.abort();
            resolve(cookie.parse(sessionCookie)['secure, _vinted_fr_session']);
        }).catch(() => {
            controller.abort();
            reject();
        });
    });
}

const getVintedQuerystring = (url, disableOrder, allowSwap) => {
    const missingIDsParams = ['catalog', 'status'];
    const params = url.match(/(?:([a-z_]+)(\[\])?=([a-zA-Z0-9_]*)&?)/g);
    const mappedParams = new Map();
    for (let param of params) {
        let [ _, paramName, isArray, paramValue ] = param.match(/(?:([a-z_]+)(\[\])?=([a-zA-Z0-9_]*)&?)/);
        if (isArray) {
            if (missingIDsParams.includes(paramName)) paramName = `${paramName}_id`;
            if (mappedParams.has(`${paramName}s`)) {
                mappedParams.set(`${paramName}s`, [ ...mappedParams.get(`${paramName}s`), paramValue ]);
            } else {
                mappedParams.set(`${paramName}s`, [paramValue]);
            }
        } else {
            mappedParams.set(paramName, paramValue);
        }
    }
    if (!mappedParams.has('order') && !disableOrder) mappedParams.set('order', 'newest_first');
    if (!mappedParams.has('is_for_swap') && !allowSwap) mappedParams.set('is_for_swap', '0');
    const finalParams = [];
    for (let [ key, value ] of mappedParams.entries()) {
        finalParams.push(typeof value === 'string' ? `${key}=${value}` : `${key}=${value.join(',')}`);
    }
    return finalParams.join('&');
}


const search = (url, options = {
    disableOrder: false,
    allowSwap: false
}) => {
    return new Promise((resolve, reject) => {

        const params = getVintedQuerystring(url, options.disableOrder ?? false, options.allowSwap ?? false);

        fetchCookie().then((cookie) => {
            const controller = new AbortController();
            fetch('https://www.vinted.fr/api/v2/items?' + params, {
                signal: controller.signal,
                headers: {
                    cookie: '_vinted_fr_session=' + cookie,
                    'user-agent': new UserAgent().toString(),
                    accept: 'application/json, text/plain, */*'
                }
            }).then((res) => {
                res.text().then((text) => {
                    controller.abort();
                    try {
                        resolve(JSON.parse(text));
                    } catch (e) {
                        reject(text);
                    }
                });
            }).catch(() => {
                controller.abort();
                reject('Can not fetch search API');
            });
        }).catch(() => reject('Can not fetch cookie'));
    });
}

module.exports = {
    fetchCookie,
    getVintedQuerystring,
    search
}