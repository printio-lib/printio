declare class DOMUtilsClass {
	private static _imageMimeTypes;
	getWindowSize(
		win: Window,
	): {
		width: number;
		height: number;
	};
	getElementWindow(element: HTMLElement): Window;
	addClassToElement(element: HTMLElement, classToAdd: string): void;
	removeClassFromElement(element: HTMLElement, classToRemove: string): void;
	getElementSizeAfterTimeoutZero(
		element: HTMLElement,
	): Promise<{
		width: number;
		height: number;
	}>;
	removeScriptTagsFromHTML(html: string): string;
	addStyleToDocument(doc: Document, css: string): void;
	canvasToDataURL(canvas: HTMLCanvasElement, imageMimeType: string): string;
	canvasToPNGDataUrl(canvas: HTMLCanvasElement): string;
	canvasToJPGDataUrl(canvas: HTMLCanvasElement): string;
	canvasToImage(canvas: HTMLCanvasElement, imageMimeType: string): HTMLImageElement;
	canvasToPNGImage(canvas: HTMLCanvasElement): HTMLImageElement;
	canvasToJPGImage(canvas: HTMLCanvasElement): HTMLImageElement;
	downloadCanvasAsImage(canvas: HTMLCanvasElement, imageMimeType: string, imageFileName: string): void;
	downloadCanvasAsPNGImage(canvas: HTMLCanvasElement): void;
	downloadCanvasAsJPGImage(canvas: HTMLCanvasElement): void;
}
export declare const DOMUtils: DOMUtilsClass;
export {};
