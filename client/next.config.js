const withAntdLess = require('next-plugin-antd-less');
module.exports = withAntdLess({
    publicRuntimeConfig: {
        APP_NAME: 'Coursemine',
        API: 'http://localhost:8000/api',
        PRODUCTION: false,
        DOMAIN: 'http://localhost:3000',
        FB_APP_ID: 'JJSLKADFLKSAHFDSLKL'
    }
});

