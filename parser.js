"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var ndjson = require('ndjson');
var sharp = require('sharp');
var readline = require("readline");
/**
 * Contains the categories you want to convert.
 * Categories must be in alphabetical order.
 */
var dataList = [
    "apple",
    //"baseball",
    //"bicycle",
    "campfire",
    //"car",
    //"cup",
    "diamond",
    "donut",
    //"elephant",
    "face",
    "fish",
    //"foot",
    "hand",
    "house",
    //"key",
    //"mountain",
    //"pants",
    "pizza",
    //"snowman",
    "t-shirt",
    //"tree"
];
/**
 *  Converts all ndjson from the data directory to png files.
 * @param maxFiles specifies how many drawings are to be created from a category.
 */
function convertAll(maxFiles) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (j) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, parseSimplifiedDrawings("data/full_simplified_" + dataList[j] + ".ndjson", function (err, drawings) {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var i, percent;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (err)
                                                            return [2 /*return*/, console.error(err)];
                                                        i = 0;
                                                        _a.label = 1;
                                                    case 1:
                                                        if (!(i < maxFiles)) return [3 /*break*/, 4];
                                                        percent = Math.round((j * maxFiles + i) / (dataList.length * maxFiles) * 1000) / 1000;
                                                        return [4 /*yield*/, convertOneDrawing(drawings[i], maxFiles, i, percent)];
                                                    case 2:
                                                        _a.sent();
                                                        _a.label = 3;
                                                    case 3:
                                                        i++;
                                                        return [3 /*break*/, 1];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        });
                                    })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    j = 0;
                    _a.label = 1;
                case 1:
                    if (!(j < dataList.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(j)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    j++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Finished parsing');
                    return [2 /*return*/];
            }
        });
    });
}
/**
 *  Converts one ndjson to many png files.
 * @param maxFiles specifies how many drawings are to be created from a category.
 * @param categoryName name of the category to be converted.
 */
function convertSpecific(maxFiles, categoryName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseSimplifiedDrawings("data/full_simplified_" + categoryName + ".ndjson", function (err, drawings) {
                        return __awaiter(this, void 0, void 0, function () {
                            var i, percent;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err)
                                            return [2 /*return*/, console.error(err)];
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < maxFiles)) return [3 /*break*/, 4];
                                        percent = Math.round((i) / (maxFiles) * 1000) / 1000;
                                        return [4 /*yield*/, convertOneDrawing(drawings[i], maxFiles, i, percent)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    })];
                case 1:
                    _a.sent();
                    console.log('Finished parsing');
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Converts one drawing to one png file.
 * These are saved on the system at the end under the path: [dirname]/data/images/[category]/[category]_[imageId].png`
 * @param drawing contains the drawing to convert
 * @param maxFiles specifies how many drawings are to be created from a category.
 * @param iterator
 * @param percent contains the progress percentage.
 */
function convertOneDrawing(drawing, maxFiles, iterator, percent) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = generate_svg(drawing.drawing);
                    // Handles progress console output
                    console.clear();
                    console.log(drawing.word + ": " + iterator + "/" + maxFiles + "    (" + (percent * 100).toFixed(1) + "%)");
                    // Converts svg to png and saves it to the according directory
                    return [4 /*yield*/, sharp(Buffer.from(res))
                            .png()
                            .flatten({ background: "#FFFFFF" })
                            .toFile(__dirname + ("/data/images/" + drawing.word + "/" + drawing.word + "_" + drawing.key_id + ".png"))];
                case 1:
                    // Converts svg to png and saves it to the according directory
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Parse the ndjson files from quick draw dataset to single objects.
 * After parsing, the objects are added to the "drawings" array.
 * At the end, the callback is executed, waited for and the drawings are transferred with it.
 * @param path path to the ndjson file.
 * @param callback contains the function which runs after the parsing of the ndsjon to a object.
 */
function parseSimplifiedDrawings(path, callback) {
    var _this = this;
    return new Promise(function (resolve) {
        var drawings = [];
        var fileStream = fs.createReadStream(path);
        fileStream
            .pipe(ndjson.parse())
            .on('data', function (obj) {
            drawings.push(obj);
        })
            .on("error", callback)
            .on("end", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, callback(null, drawings)];
                    case 1:
                        _a.sent();
                        resolve(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
/**
 * Converts the ndjson.drawing data into a svg-file.
 * @param data the drawing data of a single image.
 * @return returns a string containing the svg of the given image.
 */
function generate_svg(data) {
    var svg = '';
    svg += '<svg width="255px" height="255px" version="1.1" xmlns="http://www.w3.org/2000/svg">\n';
    // Iterates over the "x", "y" values and creates a line between these points.
    for (var j = 0; j < data.length; j++) {
        for (var i = 0; i < data[j][0].length - 1; i++) {
            var path = '';
            path += 'M' + data[j][0][i] + ' ' + data[j][1][i]; // moveTo
            path += ' L ' + data[j][0][i + 1] + ' ' + data[j][1][i + 1]; // lineTo
            path += ' Z'; // closePath
            svg += '<path d="' + path + '" stroke="black" stroke-width="2"/>\n';
        }
    }
    svg += '</svg>\n';
    return svg;
}
/**
 * Entry point of the program.
 * Manages the user input.
 */
function main() {
    var _this = this;
    var maxFiles;
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Type the maximum images per category you want to convert. \n", function (answer) {
        maxFiles = +answer;
        rl.question("Type the name of the data you want to convert. Type 'all' to convert all data \n", function (answer) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(answer.toLocaleLowerCase() == "all")) return [3 /*break*/, 2];
                        console.log("Converting all data with " + maxFiles + " per dataset.");
                        return [4 /*yield*/, convertAll(maxFiles)];
                    case 1:
                        _a.sent();
                        rl.close();
                        return [3 /*break*/, 4];
                    case 2:
                        console.log("Converting " + maxFiles + " " + answer + " images.");
                        return [4 /*yield*/, convertSpecific(maxFiles, answer)];
                    case 3:
                        _a.sent();
                        rl.close();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
}
/**
 * Starts the program.
 */
main();
//# sourceMappingURL=parser.js.map