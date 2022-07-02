const withAntdLess = require('next-plugin-antd-less');
module.exports = withAntdLess({
    publicRuntimeConfig: {
        APP_NAME: 'Coursemine',
        API: 'https://coursemine-api.herkuapp.com/api',
        PRODUCTION: true,
        DOMAIN: 'https://coursemine-v1.vercel.app/',
        FB_APP_ID: 'JJSLKADFLKSAHFDSLKL'
    }
});

