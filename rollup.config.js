import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'src/woopig-twitter.js',
        plugins: [
            commonjs(),
            getBabelOutputPlugin({
                presets: ['@babel/preset-env']
            })
        ],
        output: [
            {
                file: 'dist/woopig-twitter.js',
                format: 'cjs',
                exports: 'named',
                sourcemap: false,
                strict: true
            }
        ]
    }, {
        input: 'src/woopig-youtube.js',
        plugins: [
            commonjs(),
            getBabelOutputPlugin({
                presets: ['@babel/preset-env']
            })
        ],
        output: [
            {
                file: 'dist/woopig-youtube.js',
                format: 'cjs',
                exports: 'named',
                sourcemap: false,
                strict: true
            }
        ]
    }
];