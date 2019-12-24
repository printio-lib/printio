import rasterizehtml from 'rasterizehtml';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator['throw'](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done
				? resolve(result.value)
				: new P(function(resolve) {
						resolve(result.value);
				  }).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}

function __generator(thisArg, body) {
	var _ = {
			label: 0,
			sent: function() {
				if (t[0] & 1) throw t[1];
				return t[1];
			},
			trys: [],
			ops: [],
		},
		f,
		y,
		t,
		g;
	return (
		(g = { next: verb(0), throw: verb(1), return: verb(2) }),
		typeof Symbol === 'function' &&
			(g[Symbol.iterator] = function() {
				return this;
			}),
		g
	);
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError('Generator is already executing.');
		while (_)
			try {
				if (
					((f = 1),
					y &&
						(t =
							op[0] & 2
								? y['return']
								: op[0]
								? y['throw'] || ((t = y['return']) && t.call(y), 0)
								: y.next) &&
						!(t = t.call(y, op[1])).done)
				)
					return t;
				if (((y = 0), t)) op = [op[0] & 2, t.value];
				switch (op[0]) {
					case 0:
					case 1:
						t = op;
						break;
					case 4:
						_.label++;
						return { value: op[1], done: false };
					case 5:
						_.label++;
						y = op[1];
						op = [0];
						continue;
					case 7:
						op = _.ops.pop();
						_.trys.pop();
						continue;
					default:
						if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
							_ = 0;
							continue;
						}
						if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
							_.label = op[1];
							break;
						}
						if (op[0] === 6 && _.label < t[1]) {
							_.label = t[1];
							t = op;
							break;
						}
						if (t && _.label < t[2]) {
							_.label = t[2];
							_.ops.push(op);
							break;
						}
						if (t[2]) _.ops.pop();
						_.trys.pop();
						continue;
				}
				op = body.call(thisArg, _);
			} catch (e) {
				op = [6, e];
				y = 0;
			} finally {
				f = t = 0;
			}
		if (op[0] & 5) throw op[1];
		return { value: op[0] ? op[1] : void 0, done: true };
	}
}

var ExportElementMode;
(function(ExportElementMode) {
	ExportElementMode['Print'] = 'print';
	ExportElementMode['Canvas'] = 'canvas';
	ExportElementMode['PNGImage'] = 'png-image';
	ExportElementMode['PNGDataUrl'] = 'png-data-url';
	ExportElementMode['DownloadPNGImage'] = 'download-png-image';
	ExportElementMode['JPGImage'] = 'jpg-image';
	ExportElementMode['JPGDataUrl'] = 'jpg-data-url';
	ExportElementMode['DownloadJPGImage'] = 'download-jpg-image';
})(ExportElementMode || (ExportElementMode = {}));

var DOMUtilsClass = /** @class */ (function() {
	function DOMUtilsClass() {}
	DOMUtilsClass.prototype.getWindowSize = function(win) {
		var doc = win.document;
		var docElem = doc.documentElement;
		var body = doc.getElementsByTagName('body')[0];
		var winWidth = win.innerWidth || docElem.clientWidth || body.clientWidth;
		var winHeight = win.innerHeight || docElem.clientHeight || body.clientHeight;
		return {
			width: winWidth,
			height: winHeight,
		};
	};
	DOMUtilsClass.prototype.getElementWindow = function(element) {
		var doc = element.ownerDocument;
		var win = doc.defaultView || doc['parentWindow'];
		return win;
	};
	DOMUtilsClass.prototype.addClassToElement = function(element, classToAdd) {
		var newClassName = element.className || '';
		if (newClassName) {
			newClassName += ' ';
		}
		newClassName += classToAdd;
		element.className = newClassName;
	};
	DOMUtilsClass.prototype.removeClassFromElement = function(element, classToRemove) {
		if (element.className) {
			element.className = element.className.replace(new RegExp('(?:^|\\s)' + classToRemove + '(?!\\S)', 'g'), '');
		}
	};
	DOMUtilsClass.prototype.getElementSizeAfterTimeoutZero = function(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				return [
					2 /*return*/,
					new Promise(function(resolve, reject) {
						setTimeout(function() {
							return resolve({
								width: element.offsetWidth,
								height: element.offsetHeight,
							});
						}, 0);
					}),
				];
			});
		});
	};
	DOMUtilsClass.prototype.removeScriptTagsFromHTML = function(html) {
		// See https://stackoverflow.com/a/6660315
		return html && html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
	};
	// See https://stackoverflow.com/a/524721
	DOMUtilsClass.prototype.addStyleToDocument = function(doc, css) {
		var head = doc.head;
		var style = doc.createElement('style');
		style.type = 'text/css';
		var styleStyleSheet = style['styleSheet'];
		if (styleStyleSheet) {
			// This is required for IE8 and below.
			styleStyleSheet.cssText = css;
		} else {
			style.appendChild(doc.createTextNode(css));
		}
		head.appendChild(style);
	};
	DOMUtilsClass.prototype.canvasToDataURL = function(canvas, imageMimeType) {
		return canvas.toDataURL(imageMimeType, '');
	};
	DOMUtilsClass.prototype.canvasToPNGDataUrl = function(canvas) {
		return this.canvasToDataURL(canvas, DOMUtilsClass._imageMimeTypes.png);
	};
	DOMUtilsClass.prototype.canvasToJPGDataUrl = function(canvas) {
		return this.canvasToDataURL(canvas, DOMUtilsClass._imageMimeTypes.jpg);
	};
	DOMUtilsClass.prototype.canvasToImage = function(canvas, imageMimeType) {
		var img = new Image();
		img.src = this.canvasToDataURL(canvas, imageMimeType);
		return img;
	};
	DOMUtilsClass.prototype.canvasToPNGImage = function(canvas) {
		return this.canvasToImage(canvas, DOMUtilsClass._imageMimeTypes.png);
	};
	DOMUtilsClass.prototype.canvasToJPGImage = function(canvas) {
		return this.canvasToImage(canvas, DOMUtilsClass._imageMimeTypes.jpg);
	};
	DOMUtilsClass.prototype.downloadCanvasAsImage = function(canvas, imageMimeType, imageFileName) {
		var doc = canvas.ownerDocument;
		var a = doc.createElement('a');
		a.href = this.canvasToDataURL(canvas, imageMimeType);
		a.download = imageFileName;
		doc.body.appendChild(a);
		a.click();
		a.remove();
	};
	DOMUtilsClass.prototype.downloadCanvasAsPNGImage = function(canvas) {
		this.downloadCanvasAsImage(canvas, DOMUtilsClass._imageMimeTypes.png, 'element-screenshot.png');
	};
	DOMUtilsClass.prototype.downloadCanvasAsJPGImage = function(canvas) {
		this.downloadCanvasAsImage(canvas, DOMUtilsClass._imageMimeTypes.jpg, 'element-screenshot.jpg');
	};
	DOMUtilsClass._imageMimeTypes = {
		png: 'image/png',
		jpg: 'image/jpeg',
	};
	return DOMUtilsClass;
})();
// tslint:disable-next-line:variable-name
var DOMUtils = new DOMUtilsClass();

var ElementToCanvasUtilsClass = /** @class */ (function() {
	function ElementToCanvasUtilsClass() {}
	ElementToCanvasUtilsClass.prototype.elementToCanvas = function(element, width, height) {
		return __awaiter(this, void 0, void 0, function() {
			var mainDoc, canvas, elemDoc;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						mainDoc = window.document;
						canvas = mainDoc.createElementNS('http://www.w3.org/1999/xhtml', 'html:canvas');
						canvas.width = width;
						canvas.height = height;
						elemDoc = element.ownerDocument;
						return [
							4 /*yield*/,
							rasterizehtml.drawDocument(elemDoc, canvas, { width: width, height: height }),
						];
					case 1:
						_a.sent();
						return [2 /*return*/, canvas];
				}
			});
		});
	};
	return ElementToCanvasUtilsClass;
})();
// tslint:disable-next-line:variable-name
var ElementToCanvasUtils = new ElementToCanvasUtilsClass();

var ElementExporterCSSConstants = /** @class */ (function() {
	function ElementExporterCSSConstants(guid) {
		this.guid = guid;
		this.elemMarkerClassName = 'export-elem-' + this.guid;
		this.thisClassName = 'this-' + this.guid;
		this.siblingClassName = 'sibling-' + this.guid;
		this.parentClassName = 'parent-' + this.guid;
		this.dstCSS =
			'.' +
			this.thisClassName +
			' {\n\tmargin: 0 !important;\n}\n.' +
			this.siblingClassName +
			' {\n\tdisplay: block !important;\n\twidth: 0 !important;\n\theight: 0 !important;\n\tpadding: 0 !important;\n\tmargin: 0 !important;\n\toverflow: hidden !important;\n\topacity: 0 !important;\n}\n.' +
			this.parentClassName +
			' {\n\tdisplay: block !important;\n\tpadding: 0 !important;\n\tmargin: 0 !important;\n\tborder: none !important;\n}';
	}
	Object.defineProperty(ElementExporterCSSConstants, 'instance', {
		get: function() {
			if (!ElementExporterCSSConstants._instance) {
				ElementExporterCSSConstants._instance = new ElementExporterCSSConstants(
					'a4023ad7-8bb2-4f71-adb0-38826e63d1d9',
				);
			}
			return ElementExporterCSSConstants._instance;
		},
		enumerable: true,
		configurable: true,
	});
	return ElementExporterCSSConstants;
})();
var ElementExporter = /** @class */ (function() {
	function ElementExporter(element) {
		this._element = element;
		this._cssConstants = ElementExporterCSSConstants.instance;
		this._srcBodyCSS = element.ownerDocument.body.style.cssText;
		this._srcContentForExporting = this.getElementWindowSrcForExporting(element);
	}
	ElementExporter.prototype.exportElement = function(exportElementMode) {
		return __awaiter(this, void 0, void 0, function() {
			var srcElem, dstWinSize, dstWin, dstDoc, dstElem, dstCanvas, result;
			return __generator(this, function(_a) {
				srcElem = this._element;
				dstWinSize = this.computeDstWinSize(srcElem);
				dstWin = window.open('', 'Export', 'width=' + dstWinSize.width + ',height=' + dstWinSize.height);
				dstDoc = dstWin.document;
				dstDoc.write(this._srcContentForExporting);
				dstDoc.close();
				dstDoc.body.style.cssText = this._srcBodyCSS;
				DOMUtils.addStyleToDocument(dstDoc, this._cssConstants.dstCSS);
				dstElem = dstDoc.getElementsByClassName(this._cssConstants.elemMarkerClassName)[0];
				this.prepareDstDomForExporting(dstElem);
				dstCanvas = null;
				// Export
				dstWin.focus();
				switch (exportElementMode) {
					case ExportElementMode.Print:
						//dstDoc.body.innerHTML = '';
						//dstDoc.body.appendChild(dstCanvas);
						//dstWin.print();
						result = undefined;
						return [2 /*return*/, undefined];
						break;
					case ExportElementMode.Canvas:
						result = dstCanvas;
						break;
					case ExportElementMode.PNGImage:
						result = DOMUtils.canvasToPNGImage(dstCanvas);
						break;
					case ExportElementMode.PNGDataUrl:
						result = DOMUtils.canvasToPNGDataUrl(dstCanvas);
						break;
					case ExportElementMode.DownloadPNGImage:
						DOMUtils.downloadCanvasAsPNGImage(dstCanvas);
						result = undefined;
						break;
					case ExportElementMode.JPGImage:
						result = DOMUtils.canvasToJPGImage(dstCanvas);
						break;
					case ExportElementMode.JPGDataUrl:
						result = DOMUtils.canvasToJPGDataUrl(dstCanvas);
						break;
					case ExportElementMode.DownloadJPGImage:
						DOMUtils.downloadCanvasAsJPGImage(dstCanvas);
						result = undefined;
						break;
				}
				// Close dst win
				dstWin.close();
				// Return result
				return [2 /*return*/, result];
			});
		});
	};
	ElementExporter.prototype.getElementWindowSrcForExporting = function(srcElem) {
		var srcDoc = srcElem.ownerDocument;
		var srcBody = srcDoc.body;
		srcBody.style.opacity = '0';
		DOMUtils.addClassToElement(srcElem, this._cssConstants.elemMarkerClassName);
		var srcContent = srcDoc.documentElement.innerHTML;
		srcContent = DOMUtils.removeScriptTagsFromHTML(srcContent);
		srcBody.style.cssText = this._srcBodyCSS;
		DOMUtils.removeClassFromElement(srcElem, this._cssConstants.elemMarkerClassName);
		return srcContent;
	};
	ElementExporter.prototype.computeDstWinSize = function(srcElem) {
		var srcWin = DOMUtils.getElementWindow(srcElem);
		var srcWinSize = DOMUtils.getWindowSize(srcWin);
		var dstWinSize = {
			width: srcWinSize.width,
			height: srcElem.offsetHeight * 1.5,
		};
		return dstWinSize;
	};
	ElementExporter.prototype.dstElemToCanvas = function(dstElem) {
		return __awaiter(this, void 0, void 0, function() {
			var dstElemSize, dstCanvas;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, DOMUtils.getElementSizeAfterTimeoutZero(dstElem)];
					case 1:
						dstElemSize = _a.sent();
						return [
							4 /*yield*/,
							ElementToCanvasUtils.elementToCanvas(dstElem, dstElemSize.width, dstElemSize.height),
						];
					case 2:
						dstCanvas = _a.sent();
						return [2 /*return*/, dstCanvas];
				}
			});
		});
	};
	ElementExporter.prototype.prepareDstDomForExporting = function(dstElem) {
		DOMUtils.addClassToElement(dstElem, this._cssConstants.thisClassName);
		this.hideUnnecessaryElementsForExporting(dstElem);
	};
	ElementExporter.prototype.hideUnnecessaryElementsForExporting = function(elem) {
		var parentElem = elem.parentElement;
		if (!parentElem) {
			return;
		}
		DOMUtils.addClassToElement(parentElem, this._cssConstants.parentClassName);
		var siblingElemList = parentElem.children;
		for (var i = 0; i < siblingElemList.length; i++) {
			var siblingElem = siblingElemList[i];
			if (siblingElem !== elem) {
				DOMUtils.addClassToElement(siblingElem, this._cssConstants.siblingClassName);
			}
		}
		this.hideUnnecessaryElementsForExporting(parentElem);
	};
	return ElementExporter;
})();

var printio;
(function(printio) {
	function exportElement(element, exportElementMode) {
		return __awaiter(this, void 0, void 0, function() {
			var elementExporter, result;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						elementExporter = new ElementExporter(element);
						return [4 /*yield*/, elementExporter.exportElement(exportElementMode)];
					case 1:
						result = _a.sent();
						return [2 /*return*/, result];
				}
			});
		});
	}
	printio.exportElement = exportElement;
	function printElement(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.Print)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.printElement = printElement;
	function elementToCanvas(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.Canvas)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.elementToCanvas = elementToCanvas;
	function elementToPNGImage(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.PNGImage)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.elementToPNGImage = elementToPNGImage;
	function elementToPNGDataUrl(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.PNGDataUrl)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.elementToPNGDataUrl = elementToPNGDataUrl;
	function downloadPNGImageByElement(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.DownloadPNGImage)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.downloadPNGImageByElement = downloadPNGImageByElement;
	function elementToJPGImage(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.JPGImage)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.elementToJPGImage = elementToJPGImage;
	function elementToJPGDataUrl(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.JPGDataUrl)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.elementToJPGDataUrl = elementToJPGDataUrl;
	function downloadJPGImageByElement(element) {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						return [4 /*yield*/, printio.exportElement(element, ExportElementMode.DownloadJPGImage)];
					case 1:
						return [2 /*return*/, _a.sent()];
				}
			});
		});
	}
	printio.downloadJPGImageByElement = downloadJPGImageByElement;
})(printio || (printio = {}));

var printio$1 = printio;

export default printio$1;
//# sourceMappingURL=index.es.mjs.map
