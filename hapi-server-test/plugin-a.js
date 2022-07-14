'use strict';

function register(server) {
    const cache = server.cache({ segment: 'hello' });

    async function onPreHandler(request, h) {
        await cache.set('hello', 'world', 500);
        request.plugins.a = await cache.get('hello');
        return h.continue;
    }

    server.ext('onPreHandler', onPreHandler);
}

module.exports = {
    name: 'plugin-a',
    version: '1.0.0',
    register,
};