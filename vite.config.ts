import { defineConfig } from 'vite'

export default defineConfig({
	build:{
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
			},
		},
		chunkSizeWarningLimit: 2048,
		assetsInlineLimit: 0,
	},
	plugins: [],
	server: { host: '0.0.0.0', port: 8000 },
	clearScreen: false,
})
