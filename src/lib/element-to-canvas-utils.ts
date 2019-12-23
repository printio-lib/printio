import * as rasterizeHTML from 'rasterizehtml';

class ElementToCanvasUtilsClass {
	async elementToCanvas(element: Element, width: number, height: number): Promise<HTMLCanvasElement> {
		const mainDoc = window.document;

		const canvas = <HTMLCanvasElement>mainDoc.createElementNS('http://www.w3.org/1999/xhtml', 'html:canvas');
		canvas.width = width;
		canvas.height = height;

		const elemDoc = element.ownerDocument;
		await rasterizeHTML.drawDocument(elemDoc, canvas, { width, height });

		return canvas;
	}
}

// tslint:disable-next-line:variable-name
export const ElementToCanvasUtils = new ElementToCanvasUtilsClass();
