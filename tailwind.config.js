module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			flex: {
				"30pc": "1 1 30%",
				"70pc": "1 1 70%"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
