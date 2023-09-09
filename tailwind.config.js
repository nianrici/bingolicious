/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
	"./templates/index.html",
	"./static/js/sorteo.js",
	"./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
    plugins: [
	require("flowbite/plugin")
  ],
}

