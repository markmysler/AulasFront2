const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,
	chainWebpack: (config) => {
		config.plugin("define").tap((args) => {
			args[0]["__VUE_PROD_HYDRATION_MISMATCH_DETAILS__"] = "true";
			return args;
		});
	},
});
module.exports = {
	// ...other vue-cli plugin options...
	pwa: {
		name: "Aulas",
		themeColor: "#d9d9d9",
		msTileColor: "#d9d9d9",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "default",
		manifestPath: "./manifest.json",
		manifestOptions: {
			name: "Aulas HGAJAF",
			short_name: "Aulas",
			start_url: ".",
			display: "fullscreen",
		},

		// configure the workbox plugin
		workboxPluginMode: "InjectManifest",
		workboxOptions: {
			// swSrc is required in InjectManifest mode.
			swSrc: "dev/sw.js",
			// ...other Workbox options...
		},
	},
};
