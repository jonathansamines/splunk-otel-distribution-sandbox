'use strict';

const timers = require('timers/promises');
const api = require('@opentelemetry/api');
const Hapi = require('@hapi/hapi');
const Redis = require('@hapi/catbox-redis');
const Pino = require('hapi-pino');
const PluginA = require('./plugin-a');
const pino = require('pino');

const { setTimeout: delay } = timers;
const { trace, diag, DiagLogLevel } = api;

const logger = pino({ level: 'debug' });
diag.setLogger(logger, DiagLogLevel.DEBUG);

async function run() {
    const tracer = trace.getTracer('hapi-server-test', '1.0.0');

    const server = new Hapi.Server({
        host: '127.0.0.1',
        port: 4040,
        cache: {
            provider: {
                constructor: Redis,
                options: {
                    partition: 'the-partition',
                    host: '127.0.0.1',
                    port: 6379
                }
            },
        },
    });

    const PluginB = {
        pkg: {
            name: 'plugin-b',
            version: '1.0.0',
        },
        register(server) {
            server.route([
                {
                    path: '/world',
                    method: 'GET',
                    options: {
                        ext: {
                            onPreHandler: {
                                method(request, h) {
                                    return h.continue;
                                }
                            }
                        }
                    },
                    handler() {
                        return 'hello';
                    }
                },
                {
                    path: '/world-2',
                    method: 'GET',
                    handler() {
                        return 'hello';
                    }
                },
            ]);
        }
    };

    await server.register({ plugin: PluginB });

    await server.register({ plugin: PluginA });
    await server.register({ plugin: Pino });

    server.route({
        method: ['GET', 'POST'],
        path: '/hello',
        async handler(request) {
            return tracer.startActiveSpan('handler span', async (span) => {
                await delay(10);
                span.end();
                return 'world ' + request.plugins.a;
            });
        }
    });

    server.start();
}

run();