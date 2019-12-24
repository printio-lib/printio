import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/index.ts',

	output: [
		{ file: 'lib/index.cjs.js', format: 'cjs', sourcemap: true },
		{ file: 'lib/index.es.mjs', format: 'es', sourcemap: true },
	],

	external: [],

	plugins: [
		typescript({
			tsconfig: 'tsconfig.json',
			useTsconfigDeclarationDir: true,
		}),
	],
};
