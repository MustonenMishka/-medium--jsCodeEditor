import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";

let isInitialized = false;

export const initializeBundler = async () => {
    if (!isInitialized) {
        try {
            await esbuild.initialize({
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.11.16/esbuild.wasm',
            });
            isInitialized = true;
        } catch (e) {
            console.log(e)
        }
    }
}

const bundleCode = async (rawCode: string) => {
    try {
        const transformedCode = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            },
            jsxFactory: '_React.createElement',
            jsxFragment: '_React.Fragment'
        });

        return {
            code: transformedCode.outputFiles[0].text,
            err: ''
        }
    } catch (err) {
        return {
            code: '',
            err: err.message
        }
    }
}

export default bundleCode;