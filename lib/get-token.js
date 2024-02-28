const request = require('request-promise');

module.exports = async () => {
    const APP_ID = process.env.APP_ID, SECRET = process.env.SECRET;
    const res = await request.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${SECRET}`);
    const resData = JSON.parse(res);
    if (!(resData.access_token && resData.expires_in)) {
        console.error('获取token失败:', JSON.stringify(resData));
        return;
    }
    return resData.access_token;
};
