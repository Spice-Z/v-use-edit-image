// Polyfill for encoding which isn't present globally in jsdom
if (typeof global.TextEncoder === 'undefined') {
 const { TextEncoder } = require('util');
 global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
 const { TextEncoder } = require('util');
 global.TextDecoder = TextDecoder;
}