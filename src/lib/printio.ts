import { ExportElementMode } from './export-element-mode';
import { ExportElementResult } from './export-element-result';
import { ElementExporter } from './element-exporter';

export module printio {
	export async function exportElement(
		element: HTMLElement,
		exportElementMode: ExportElementMode,
	): Promise<ExportElementResult> {
		const elementExporter = new ElementExporter(element);
		const result = await elementExporter.exportElement(exportElementMode);

		return result;
	}

	export async function printElement(element: HTMLElement): Promise<void> {
		return (await printio.exportElement(element, ExportElementMode.Print)) as void;
	}

	export async function elementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
		return (await printio.exportElement(element, ExportElementMode.Canvas)) as HTMLCanvasElement;
	}

	export async function elementToPNGImage(element: HTMLElement): Promise<HTMLImageElement> {
		return (await printio.exportElement(element, ExportElementMode.PNGImage)) as HTMLImageElement;
	}

	export async function elementToPNGDataUrl(element: HTMLElement): Promise<string> {
		return (await printio.exportElement(element, ExportElementMode.PNGDataUrl)) as string;
	}

	export async function downloadPNGImageByElement(element: HTMLElement): Promise<void> {
		return (await printio.exportElement(element, ExportElementMode.DownloadPNGImage)) as void;
	}

	export async function elementToJPGImage(element: HTMLElement): Promise<HTMLImageElement> {
		return (await printio.exportElement(element, ExportElementMode.JPGImage)) as HTMLImageElement;
	}

	export async function elementToJPGDataUrl(element: HTMLElement): Promise<string> {
		return (await printio.exportElement(element, ExportElementMode.JPGDataUrl)) as string;
	}

	export async function downloadJPGImageByElement(element: HTMLElement): Promise<void> {
		return (await printio.exportElement(element, ExportElementMode.DownloadJPGImage)) as void;
	}
}
