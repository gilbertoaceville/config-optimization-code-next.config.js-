//Plugins required for optimization
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const CompressionPlugin = require('compression-webpack-plugin')

const withPlugins = require('next-compose-plugins')

const withProgressBar = require('next-progressbar')

require('dotenv').config();

const nextConfig = {
    webpack: (config, { dev, isServer }) => {

        //set minimize to true to allow code minification
        config.optimization.minimize = true;

        // Optimizing/minify JS
        config.optimization.minimizer.push(new UglifyJsPlugin({
            cache: true,
            parallel: true
        }))

        //css optimization
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    { discardComments: { removeAll: true } }
                ]
            },
        }))

        //optimization of network payload
        config.plugins.push(new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }))

        return config
    }
}

module.exports = withPlugins([
    withProgressBar()
],
    nextConfig
)
