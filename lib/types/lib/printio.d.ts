import { ExportElementMode } from './export-element-mode';
import { ExportElementResult } from './export-element-result';
export declare module printio {
	function exportElement(element: HTMLElement, exportElementMode: ExportElementMode): Promise<ExportElementResult>;
	function printElement(element: HTMLElement): Promise<void>;
	function elementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement>;
	function elementToPNGImage(element: HTMLElement): Promise<HTMLImageElement>;
	function elementToPNGDataUrl(element: HTMLElement): Promise<string>;
	function downloadPNGImageByElement(element: HTMLElement): Promise<void>;
	function elementToJPGImage(element: HTMLElement): Promise<HTMLImageElement>;
	function elementToJPGDataUrl(element: HTMLElement): Promise<string>;
	function downloadJPGImageByElement(element: HTMLElement): Promise<void>;
}
