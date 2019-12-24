import { ExportElementMode } from './export-element-mode';
import { ExportElementResult } from './export-element-result';
export declare class ElementExporter {
	private readonly _element;
	private readonly _cssConstants;
	private readonly _srcBodyCSS;
	private readonly _srcContentForExporting;
	constructor(element: HTMLElement);
	exportElement(exportElementMode: ExportElementMode): Promise<ExportElementResult>;
	private getElementWindowSrcForExporting;
	private computeDstWinSize;
	private dstElemToCanvas;
	private prepareDstDomForExporting;
	private hideUnnecessaryElementsForExporting;
}
