const { src, dest, watch} = require('gulp');
const sassCompiler = require('sass');
const sassFactory = require('gulp-sass');
const sass = sassFactory(sassCompiler);

exports.default = async () =>{
    console.log('hello world');
}
exports.copy = async () =>{ 
    return src('css/*.css').pipe(dest('output'));
}
exports.transpile = async () =>{ 
    return src('scss/*.scss').pipe(sass()).pipe(dest('output'));
}
exports.watchStyles = async () =>{ 
    return watch('scss/*.scss', exports.transpile)
};

