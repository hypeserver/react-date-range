// eslint-disable-next-line func-names
module.exports = function (api) {
    api.cache(true);

    const presets = [['react-app', { absoluteRuntime: false }]];
    const plugins = [['babel-plugin-styled-components']];

    return {
        presets,
        plugins,
    };
};
