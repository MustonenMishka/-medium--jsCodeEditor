import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            // Root file handler
            build.onResolve({filter: /(^index\.js$)/}, () => {
                return {path: 'index.js', namespace: 'a'};
            })
            // Relative files handler
            build.onResolve({filter: /^\.+\//}, (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path,
                        'https://unpkg.com' + args.resolveDir + '/').href
                }
            })
            // Handle main module files
            build.onResolve({filter: /.*/}, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });
        },
    };
};