import { ExportElementMode } from './export-element-mode';
import { ExportElementResult } from './export-element-result';
import { DOMUtils } from './dom-utils';
import { ElementToCanvasUtils } from './element-to-canvas-utils';

class ElementExporterCSSConstants {
	readonly guid: string;

	readonly elemMarkerClassName: string;

	readonly thisClassName: string;
	readonly siblingClassName: string;
	readonly parentClassName: string;

	readonly dstCSS: string;

	constructor(guid: string) {
		this.guid = guid;

		this.elemMarkerClassName = `export-elem-${this.guid}`;

		this.thisClassName = `this-${this.guid}`;
		this.siblingClassName = `sibling-${this.guid}`;
		this.parentClassName = `parent-${this.guid}`;

		this.dstCSS = `.${this.thisClassName} {
	margin: 0 !important;
}
.${this.siblingClassName} {
	display: block !important;
	width: 0 !important;
	height: 0 !important;
	padding: 0 !important;
	margin: 0 !important;
	overflow: hidden !important;
	opacity: 0 !important;
}
.${this.parentClassName} {
	display: block !important;
	padding: 0 !important;
	margin: 0 !important;
	border: none !important;
}`;
	}
}

export class LowLevelElementExporter {
	private readonly _element: HTMLElement;
	private readonly _cssConstantsGUID: string;
	private readonly _cssConstants: ElementExporterCSSConstants;
	private readonly _srcBodyCSS: string;
	private readonly _srcContentForExporting: string;

	constructor(element: HTMLElement) {
		this._element = element;
		this._cssConstantsGUID = 'a4023ad7-8bb2-4f71-adb0-38826e63d1d9';
		this._cssConstants = new ElementExporterCSSConstants(this._cssConstantsGUID);
		this._srcBodyCSS = element.ownerDocument.body.style.cssText;
		this._srcContentForExporting = this.getElementWindowSrcForExporting(element);
	}

	async exportElement(exportElementMode: ExportElementMode): Promise<ExportElementResult> {
		const srcElem = this._element;

		// Prepare dst win

		const dstWinSize = this.computeDstWinSize(srcElem);
		const dstWin = window.open('', 'Export', `width=${dstWinSize.width},height=${dstWinSize.height}`);
		const dstDoc = dstWin.document;
		dstDoc.write(this._srcContentForExporting);
		dstDoc.close();
		dstDoc.body.style.cssText = this._srcBodyCSS;

		DOMUtils.addStyleToDocument(dstDoc, this._cssConstants.dstCSS);

		const dstElem = <HTMLElement>dstDoc.getElementsByClassName(this._cssConstants.elemMarkerClassName)[0];
		this.prepareDstDomForExporting(dstElem);

		// Get dst canvas

		const dstCanvas = await this.dstElemToCanvas(dstElem);

		// Export

		dstWin.focus();

		let result: ExportElementResult;

		switch (exportElementMode) {
			case ExportElementMode.Print:
				dstDoc.body.innerHTML = '';
				dstDoc.body.appendChild(dstCanvas);
				dstWin.print();
				result = undefined;
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

		return result;
	}

	private getElementWindowSrcForExporting(srcElem: HTMLElement): string {
		const srcDoc = srcElem.ownerDocument;
		const srcBody = srcDoc.body;

		srcBody.style.opacity = '0';
		DOMUtils.addClassToElement(srcElem, this._cssConstants.elemMarkerClassName);

		let srcContent: string = (srcDoc.documentElement as HTMLElement).innerHTML;
		srcContent = DOMUtils.removeScriptTagsFromHTML(srcContent);

		srcBody.style.cssText = this._srcBodyCSS;
		DOMUtils.removeClassFromElement(srcElem, this._cssConstants.elemMarkerClassName);

		return srcContent;
	}

	private computeDstWinSize(srcElem: HTMLElement): { width: number; height: number } {
		const srcWin = DOMUtils.getElementWindow(srcElem);
		const srcWinSize = DOMUtils.getWindowSize(srcWin);
		const dstWinSize = {
			width: srcWinSize.width,
			height: srcElem.offsetHeight * 1.5,
		};

		return dstWinSize;
	}

	private async dstElemToCanvas(dstElem: HTMLElement): Promise<HTMLCanvasElement> {
		const dstElemSize = await DOMUtils.getElementSizeAfterTimeoutZero(dstElem);
		const dstCanvas = await ElementToCanvasUtils.elementToCanvas(dstElem, dstElemSize.width, dstElemSize.height);

		return dstCanvas;
	}

	private prepareDstDomForExporting(dstElem: HTMLElement): void {
		DOMUtils.addClassToElement(dstElem, this._cssConstants.thisClassName);
		this.hideUnnecessaryElementsForExporting(dstElem);
	}

	private hideUnnecessaryElementsForExporting(elem: Element): void {
		const parentElem = elem.parentElement;
		if (!parentElem) {
			return;
		}

		DOMUtils.addClassToElement(parentElem, this._cssConstants.parentClassName);

		const siblingElemList = parentElem.children;
		for (let i = 0; i < siblingElemList.length; i++) {
			const siblingElem = siblingElemList[i] as HTMLElement;
			if (siblingElem !== elem) {
				DOMUtils.addClassToElement(siblingElem, this._cssConstants.siblingClassName);
			}
		}

		this.hideUnnecessaryElementsForExporting(parentElem);
	}
}
