import { defineConfig } from 'vite'

export default defineConfig({
	build:{
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
				// assetFileNames: (asset) => {
				// 	console.log(parse(asset.name).name);
				// 	if (parse(asset.name).name === 'externalImage') {
				// 		return "images/src/[name][extname]";
				// 	}
				// 	return "assets/[name].[hash][extname]";
				// }
				
			},
		},
		chunkSizeWarningLimit: 2048,
		assetsInlineLimit: 0,
	},
	plugins: [],
	server: { host: '0.0.0.0', port: 8000 },
	clearScreen: false,
})
