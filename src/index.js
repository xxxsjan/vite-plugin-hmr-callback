import os from "os";

export function getIpInfo() {
  const interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        // console.log(`\n🌐 ip: ${chalk.green(alias.address)}`);
        // console.log(`🌐 mac: ${chalk.green(alias.mac)}`);
        // console.log(`🌐 netmask: ${chalk.green(alias.netmask)} \n`);
        return alias;
      }
    }
  }
  return "";
}

export default function hmrCallback(options) {
  let cb;
  if (typeof options === "function") {
    cb = options;
  }
  return {
    name: "vite-plugin-hmr-callback",
    configureServer() {},
    handleHotUpdate({ modules, server }) {
      const { port, https, host } = server.config.server;
      const protocol = https ? "https" : "http";

      // console.log("server.config.server: ", server.config.server);
      // for (const module of modules) {
      //   const { file } = module;
      // }

      console.log(`➜  Local:   ${protocol}://localhost:${port}/`);
      if (host) {
        const { address } = getIpInfo();
        console.log(`➜  Network:   ${protocol}://${address}:${port}/`);
      }
      cb && cb();
    },
  };
}
