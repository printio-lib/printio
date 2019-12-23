class DOMUtilsClass {
	private static _imageMimeTypes = {
		png: 'image/png',
		jpg: 'image/jpeg',
	};

	getWindowSize(win: Window): { width: number; height: number } {
		const doc = win.document;
		const docElem = doc.documentElement;
		const body = doc.getElementsByTagName('body')[0];
		const winWidth = win.innerWidth || docElem.clientWidth || body.clientWidth;
		const winHeight = win.innerHeight || docElem.clientHeight || body.clientHeight;

		return {
			width: winWidth,
			height: winHeight,
		};
	}

	getElementWindow(element: HTMLElement): Window {
		const doc = element.ownerDocument;
		const win = doc.defaultView || (doc as any)['parentWindow'];

		return win;
	}

	addClassToElement(element: HTMLElement, classToAdd: string): void {
		let newClassName: string = element.className || '';
		if (newClassName) {
			newClassName += ' ';
		}
		newClassName += classToAdd;

		element.className = newClassName;
	}

	removeClassFromElement(element: HTMLElement, classToRemove: string): void {
		if (element.className) {
			element.className = element.className.replace(new RegExp(`(?:^|\\s)${classToRemove}(?!\\S)`, 'g'), '');
		}
	}

	async getElementSizeAfterTimeoutZero(element: HTMLElement): Promise<{ width: number; height: number }> {
		return new Promise<{ width: number; height: number }>((resolve, reject) => {
			setTimeout(
				() =>
					resolve({
						width: element.offsetWidth,
						height: element.offsetHeight,
					}),
				0,
			);
		});
	}

	removeScriptTagsFromHTML(html: string): string {
		// See https://stackoverflow.com/a/6660315
		return html && html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
	}

	// See https://stackoverflow.com/a/524721
	addStyleToDocument(doc: Document, css: string): void {
		const head = doc.head;
		const style = doc.createElement('style');

		style.type = 'text/css';
		const styleStyleSheet = (style as any)['styleSheet'];
		if (styleStyleSheet) {
			// This is required for IE8 and below.
			styleStyleSheet.cssText = css;
		} else {
			style.appendChild(doc.createTextNode(css));
		}

		head.appendChild(style);
	}

	canvasToDataURL(canvas: HTMLCanvasElement, imageMimeType: string): string {
		return canvas.toDataURL(imageMimeType, '');
	}

	canvasToPNGDataUrl(canvas: HTMLCanvasElement): string {
		return this.canvasToDataURL(canvas, DOMUtilsClass._imageMimeTypes.png);
	}

	canvasToJPGDataUrl(canvas: HTMLCanvasElement): string {
		return this.canvasToDataURL(canvas, DOMUtilsClass._imageMimeTypes.jpg);
	}

	canvasToImage(canvas: HTMLCanvasElement, imageMimeType: string): HTMLImageElement {
		const img = new Image();
		img.src = this.canvasToDataURL(canvas, imageMimeType);
		return img;
	}

	canvasToPNGImage(canvas: HTMLCanvasElement): HTMLImageElement {
		return this.canvasToImage(canvas, DOMUtilsClass._imageMimeTypes.png);
	}

	canvasToJPGImage(canvas: HTMLCanvasElement): HTMLImageElement {
		return this.canvasToImage(canvas, DOMUtilsClass._imageMimeTypes.jpg);
	}

	downloadCanvasAsImage(canvas: HTMLCanvasElement, imageMimeType: string, imageFileName: string): void {
		const doc = canvas.ownerDocument;

		const a = doc.createElement('a');
		a.href = this.canvasToDataURL(canvas, imageMimeType);
		a.download = imageFileName;

		doc.body.appendChild(a);

		a.click();
		a.remove();
	}

	downloadCanvasAsPNGImage(canvas: HTMLCanvasElement): void {
		this.downloadCanvasAsImage(canvas, DOMUtilsClass._imageMimeTypes.png, 'element-screenshot.png');
	}

	downloadCanvasAsJPGImage(canvas: HTMLCanvasElement): void {
		this.downloadCanvasAsImage(canvas, DOMUtilsClass._imageMimeTypes.jpg, 'element-screenshot.jpg');
	}
}

// tslint:disable-next-line:variable-name
export const DOMUtils = new DOMUtilsClass();
