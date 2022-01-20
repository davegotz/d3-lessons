/** @type {import('@sveltejs/kit').Config} */
//import adapter from '@sveltejs/adapter-static';
import node from '@sveltejs/adapter-node'

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		//adapter: node()
		adapter: node({
					// default options are shown
					out: 'build',
					precompress: false,
					env: {
						path: 'SOCKET_PATH',
						host: '0.0.0.0',
						base: 'http://lessons.vaclab.unc.edu',
						headers: {
							protocol: 'http',
							host: '0.0.0.0'
						}
					}
				})
		//adapter: adapter({
		//	// default options are shown
		//	pages: 'build',
		//	assets: 'build',
		//	fallback: null
		//})
	}
};

export default config;
