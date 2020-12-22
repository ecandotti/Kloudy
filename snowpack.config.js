module.exports = {
    mount: {
        public: "/",
        src: "/dist",
        web_modules: "/web_modules"
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        [
            "@snowpack/plugin-build-script", { cmd: "postcss", input: [".css"], output: [".css"] }
        ],

    ]
}