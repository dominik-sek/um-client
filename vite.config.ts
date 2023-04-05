import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = {...process.env, ...loadEnv(mode, process.cwd())};

	return defineConfig({
		server: {
			proxy: {
				'/api/v1': {
					target: process.env.VITE_API_URL,
					changeOrigin: true,
					secure: true,
				},
			},
		},
		plugins: [react()],
	});
}