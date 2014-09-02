//Gruntfile
module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            library: {
                options: {
                    sourceMap: true,
                    sourceMapName: './dist/storage.js.map'
                },
                files: {
                    './dist/storage.min.js': [
                        './src/storage.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};