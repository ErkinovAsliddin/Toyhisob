module.exports = {
  apps: [
    {
      name: "toy-platform",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/opt/toy-platform",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_file: "/opt/toy-platform/.env.production",
      max_memory_restart: "512M",
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "/var/log/toy-platform/error.log",
      out_file: "/var/log/toy-platform/out.log",
      merge_logs: true,
    },
  ],
};
