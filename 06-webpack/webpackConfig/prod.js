import UglifyJSWebpackPlugin from 'uglifyjs-webpack-plugin';
const uglify = new UglifyJSWebpackPlugin();

export default {
    plugins : [
      uglify
    ]
}
