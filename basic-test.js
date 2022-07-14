'use strict';

const timers = require('timers/promises');
const assert = require('assert');
const { trace } = require('@opentelemetry/api');

const tracer = trace.getTracer('basic-test', '1.0.0');

async function runBasicFunction() {
    const span = tracer.startSpan('basic function span');

    await timers.setTimeout(200);
    span.end();

    return span;
}

const span = runBasicFunction();
assert.ok(span, 'span was created');

setTimeout(() => {
    console.log('ok');
}, 10000);