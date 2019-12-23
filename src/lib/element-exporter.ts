import { ExportElementMode } from './export-element-mode';
import { ExportElementResult } from './export-element-result';
import { LowLevelElementExporter } from './low-level-element-exporter';

export class ElementExporter {
	private static async exportElement(
		element: HTMLElement,
		exportElementMode: ExportElementMode,
	): Promise<ExportElementResult> {
		const lowLevelElementExporter = new LowLevelElementExporter(element);
		const result = await lowLevelElementExporter.exportElement(exportElementMode);

		return result;
	}

	async printElement(element: HTMLElement): Promise<void> {
		return (await ElementExporter.exportElement(element, ExportElementMode.Print)) as void;
	}

	async elementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
		return (await ElementExporter.exportElement(element, ExportElementMode.Canvas)) as HTMLCanvasElement;
	}

	async elementToPNGImage(element: HTMLElement): Promise<HTMLImageElement> {
		return (await ElementExporter.exportElement(element, ExportElementMode.PNGImage)) as HTMLImageElement;
	}

	async elementToPNGDataUrl(element: HTMLElement): Promise<string> {
		return (await ElementExporter.exportElement(element, ExportElementMode.PNGDataUrl)) as string;
	}

	async downloadPNGImageByElement(element: HTMLElement): Promise<void> {
		return (await ElementExporter.exportElement(element, ExportElementMode.DownloadPNGImage)) as void;
	}

	async elementToJPGImage(element: HTMLElement): Promise<HTMLImageElement> {
		return (await ElementExporter.exportElement(element, ExportElementMode.JPGImage)) as HTMLImageElement;
	}

	async elementToJPGDataUrl(element: HTMLElement): Promise<string> {
		return (await ElementExporter.exportElement(element, ExportElementMode.JPGDataUrl)) as string;
	}

	async downloadJPGImageByElement(element: HTMLElement): Promise<void> {
		return (await ElementExporter.exportElement(element, ExportElementMode.DownloadJPGImage)) as void;
	}
}
