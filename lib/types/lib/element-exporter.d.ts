export declare class ElementExporter {
	private static exportElement;
	printElement(element: HTMLElement): Promise<void>;
	elementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement>;
	elementToPNGImage(element: HTMLElement): Promise<HTMLImageElement>;
	elementToPNGDataUrl(element: HTMLElement): Promise<string>;
	downloadPNGImageByElement(element: HTMLElement): Promise<void>;
	elementToJPGImage(element: HTMLElement): Promise<HTMLImageElement>;
	elementToJPGDataUrl(element: HTMLElement): Promise<string>;
	downloadJPGImageByElement(element: HTMLElement): Promise<void>;
}
