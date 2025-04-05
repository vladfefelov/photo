import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['debug-env']
  },
  plugins: [
    {
      name: 'debug-env',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/debug-env') {
            const viteEnv = process.env;
            const envVars = Object.keys(viteEnv)
              .filter(key => key.startsWith('VITE_'))
              .reduce((obj, key) => {
                obj[key] = viteEnv[key] ? `${viteEnv[key].substring(0, 3)}...` : undefined;
                return obj;
              }, {});
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ env: envVars }, null, 2));
          } else {
            next();
          }
        });
      }
    }
  ],
})
