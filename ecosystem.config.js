module.exports = {
  apps: [
    {
      name: 'mood_music_api',
      script: './index.js',
      instances: 'max', // Usa todos los cores disponibles
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002,
      }
    }
  ]
};
