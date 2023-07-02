export default function registerDirectives(Vue, options) {
    const directives = require.context(
        // The relative path of the components folder
        './',
        // Whether or not to look in subfolders
        true,
        // The regular expression used to match base component filenames
        /\w+\.(vue|js)$/
        // optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default 'sync'
    );

    if (directives) {
        directives.keys().forEach(filePath => {
            // Get component config
            const directive = directives(filePath).default || directives(filePath);

            // Gets the file name regardless of folder depth
            const directiveName = filePath
                .split('/')
                .pop()
                .replace(/\.\w+$/, '');

            // Register filter globally
            Vue.directive(
                directiveName,
                // Look for the filter options on `.default`, which will
                // exist if the filter was exported with `export default`,
                // otherwise fall back to module's root.
                directive.default || directive
            );
        });
    }
}
