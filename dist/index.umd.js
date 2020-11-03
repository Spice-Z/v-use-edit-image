(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue-demi')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue-demi'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['v-use-edit-image/useCanvas'] = {}, global.VueDemi));
}(this, (function (exports, vueDemi) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var write = function (context, props, canvasHeight) {
        context.font = "bold " + props.fSize + "px \"\u30D2\u30E9\u30AE\u30CE\u89D2\u30B4 ProN W3\", \"Hiragino Kaku Gothic ProN\", \"\u30E1\u30A4\u30EA\u30AA\", \"Meiryo\", \"verdana\", sans-serif";
        context.textBaseline = 'middle';
        context.textAlign = props.isTextAlignCenter ? 'center' : 'start';
        context.strokeStyle = props.strokeStyle;
        context.lineWidth = props.lineWidth;
        var posY = props.y === 'bottom' ? canvasHeight - props.fSize : props.y;
        if (props.shouldShowShadow) {
            context.shadowColor = '#000';
            context.shadowBlur = 6;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
        else {
            context.shadowColor = 'none';
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
        var lineHeight = props.fSize * 1.1618;
        props.text.split('\n').forEach(function (t, i, a) {
            var y = posY - lineHeight * (a.length - (i + 1));
            if (props.backgroundColor) {
                context.fillStyle = props.backgroundColor;
                var bgW = context.measureText(t).width * 1.1;
                context.fillRect(props.x - bgW / 2, y - lineHeight / 2, bgW, lineHeight);
            }
            context.fillStyle = props.color;
            context.fillText(t, props.x, y);
            if (props.hasStroke) {
                context.strokeText(t, props.x, y);
            }
        });
    };
    var drawShapeToCanvas = function (context, props) {
        context.lineWidth = props.lineWidth;
        context.beginPath();
        props.coordinates.forEach(function (v, i) {
            if (i === 0) {
                context.moveTo(v.x, v.y);
                return;
            }
            context.lineTo(v.x, v.y);
        });
        context.closePath();
        if (props.shouldStroke) {
            context.strokeStyle = props.color;
            context.stroke();
        }
        else {
            context.fillStyle = props.color;
            context.fill();
        }
    };
    var setRect = function (canvas, x, y) {
        canvas.width = x;
        canvas.height = y;
    };
    var clip = function (context, prop) {
        console.log({ prop: prop });
        // const region = new Path2D()
        // region.rect(prop.x, prop.y, prop.width, prop.height)
        // context.clip(region)
        context.drawImage(prop.imageRef.value, prop.x, prop.y, prop.width, prop.height, 0, 0, prop.width, prop.height);
    };
    var useCanvas = function () {
        var canvasRef = vueDemi.ref(null);
        var setCanvasRect = function (x, y) {
            if (canvasRef.value === null) {
                return;
            }
            setRect(canvasRef.value, x, y);
        };
        var drawOriginImage = function (imageRef) { return __awaiter(void 0, void 0, void 0, function () {
            var canvas, ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (canvasRef.value === null || imageRef.value === null) {
                            return [2 /*return*/];
                        }
                        canvas = canvasRef.value;
                        setCanvasRect(imageRef.value.naturalWidth, imageRef.value.naturalHeight);
                        ctx = canvas.getContext('2d');
                        if (ctx === null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, ctx.drawImage(imageRef.value, 0, 0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        var drawDecorationImage = function (decorationImageRef, sizePer, dxPer, dyPer) {
            if (sizePer === void 0) { sizePer = 100; }
            if (dxPer === void 0) { dxPer = 'auto'; }
            if (dyPer === void 0) { dyPer = 'auto'; }
            return __awaiter(void 0, void 0, void 0, function () {
                var ctx, sx, sy, sWidth, sHeight, dWidth, dHeight, dx, dy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (canvasRef.value === null || decorationImageRef.value === null) {
                                return [2 /*return*/, {
                                        dWidth: 0,
                                        dHeight: 0,
                                        dx: 0,
                                        dy: 0,
                                    }];
                            }
                            ctx = canvasRef.value.getContext('2d');
                            if (ctx === null) {
                                return [2 /*return*/, {
                                        dWidth: 0,
                                        dHeight: 0,
                                        dx: 0,
                                        dy: 0,
                                    }];
                            }
                            sx = 0;
                            sy = 0;
                            sWidth = decorationImageRef.value.naturalWidth;
                            sHeight = decorationImageRef.value.naturalHeight;
                            dWidth = (canvasRef.value.width / 100) * sizePer;
                            dHeight = ((decorationImageRef.value.naturalHeight *
                                (canvasRef.value.width / decorationImageRef.value.naturalWidth)) /
                                100) *
                                sizePer;
                            dx = dxPer === 'auto'
                                ? (canvasRef.value.width / 100) * ((100 - sizePer) / 2)
                                : dxPer === 'right'
                                    ? canvasRef.value.width - dWidth
                                    : (canvasRef.value.width / 100) * dxPer;
                            dy = dyPer === 'auto'
                                ? canvasRef.value.height - dHeight - canvasRef.value.height * 0.05
                                : dyPer === 'right'
                                    ? canvasRef.value.height - dHeight
                                    : (canvasRef.value.width / 100) * dyPer;
                            return [4 /*yield*/, ctx.drawImage(decorationImageRef.value, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    dWidth: dWidth,
                                    dHeight: dHeight,
                                    dx: dx,
                                    dy: dy,
                                }];
                    }
                });
            });
        };
        var writeText = function (_a) {
            var _b = _a.fSize, fSize = _b === void 0 ? 62 : _b, _c = _a.x, x = _c === void 0 ? 100 : _c, _d = _a.y, y = _d === void 0 ? 100 : _d, _e = _a.text, text = _e === void 0 ? '' : _e, _f = _a.strokeStyle, strokeStyle = _f === void 0 ? '#000' : _f, _g = _a.lineWidth, lineWidth = _g === void 0 ? 0 : _g, _h = _a.isTextAlignCenter, isTextAlignCenter = _h === void 0 ? false : _h, _j = _a.color, color = _j === void 0 ? '#000' : _j, _k = _a.shouldShowShadow, shouldShowShadow = _k === void 0 ? false : _k, _l = _a.hasStroke, hasStroke = _l === void 0 ? false : _l, _m = _a.backgroundColor, backgroundColor = _m === void 0 ? 'transparent' : _m;
            if (canvasRef.value === null) {
                return;
            }
            var canvas = canvasRef.value;
            var ctx = canvas.getContext('2d');
            if (ctx === null) {
                return;
            }
            var props = {
                fSize: fSize,
                x: x,
                y: y,
                text: text,
                strokeStyle: strokeStyle,
                lineWidth: lineWidth,
                isTextAlignCenter: isTextAlignCenter,
                color: color,
                shouldShowShadow: shouldShowShadow,
                hasStroke: hasStroke,
                backgroundColor: backgroundColor,
            };
            write(ctx, props, canvas.height);
        };
        var drawShape = function (_a) {
            var coordinates = _a.coordinates, color = _a.color, _b = _a.shouldStroke, shouldStroke = _b === void 0 ? false : _b, _c = _a.lineWidth, lineWidth = _c === void 0 ? 4 : _c;
            if (canvasRef.value === null) {
                return;
            }
            var canvas = canvasRef.value;
            var ctx = canvas.getContext('2d');
            if (ctx === null) {
                return;
            }
            var props = {
                coordinates: coordinates,
                color: color,
                shouldStroke: shouldStroke,
                lineWidth: lineWidth,
            };
            drawShapeToCanvas(ctx, props);
        };
        var makeImageGraySepia = function () {
            if (canvasRef.value === null) {
                return;
            }
            var cWidth = canvasRef.value.width;
            var cHeight = canvasRef.value.height;
            var ctx = canvasRef.value.getContext('2d');
            if (ctx === null) {
                return;
            }
            var image = ctx.getImageData(0, 0, cWidth, cHeight);
            var dst = ctx.createImageData(cWidth, cHeight);
            for (var i = 0; i < cHeight; i++) {
                for (var j = 0; j < cWidth; j++) {
                    var pix = (i * cWidth + j) * 4;
                    /* Gray */
                    var gray = 0.299 * image.data[pix] +
                        0.587 * image.data[pix + 1] +
                        0.114 * image.data[pix + 2];
                    for (var k = 0; k < 3; k++) {
                        dst.data[pix + k] = image.data[pix + k] = gray;
                    }
                    /* Sepia */
                    dst.data[pix] = (dst.data[pix] / 255) * 240;
                    dst.data[pix + 1] = (dst.data[pix + 1] / 255) * 200;
                    dst.data[pix + 2] = (dst.data[pix + 2] / 255) * 148;
                    dst.data[pix + 3] = image.data[pix + 3];
                }
            }
            ctx.putImageData(dst, 0, 0);
        };
        var clipRect = function (prop) {
            if (canvasRef.value === null) {
                return;
            }
            var ctx = canvasRef.value.getContext('2d');
            if (ctx === null) {
                return;
            }
            ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
            setRect(canvasRef.value, prop.width, prop.height);
            clip(ctx, prop);
        };
        return {
            canvasRef: canvasRef,
            setCanvasRect: setCanvasRect,
            drawOriginImage: drawOriginImage,
            drawDecorationImage: drawDecorationImage,
            clipRect: clipRect,
            drawShape: drawShape,
            writeText: writeText,
            makeImageGraySepia: makeImageGraySepia,
        };
    };

    exports.useCanvas = useCanvas;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
