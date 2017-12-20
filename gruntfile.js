module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // Sass task
        sass: {
            examples: {
                options: {
                    outputStyle: "expanded",
                    sourceMapContents: true,
                    sourceMap: true,
                    precision: 4
                },
                files: {
                    "dist/css/custom.css": "src/scss/custom.css",
                    "dist/css/jquery-clockpicker.css": "src/scss/jquery-clockpicker.css",
                    "dist/css/bootstrap-clockpicker.css": "src/scss/bootstrap-clockpicker.css"
                }
            }
        },
        // Post CSS task
        postcss: {
            options: {
                map: true,
                processors: [
                    require("autoprefixer")({
                        browsers: ["last 2 versions"]
                    })
                ]
            },
            examples: {
                src: "dist/css/**/*.css"
            }
        },
        copy: {
            main: {
                files: [{
                    cwd: 'src/scripts',  // set working folder / root to copy
                    src: '**/*',           // copy all files and subfolders
                    dest: 'dist/scripts',    // destination folder
                    expand: true           // required when using cwd
                },
                    {
                        cwd: 'src/images',  // set working folder / root to copy
                        src: '**/*',           // copy all files and subfolders
                        dest: 'dist/images',    // destination folder
                        expand: true           // required when using cwd
                    }]
            }
        },
        // Watch task
        watch: {
            copy: {
                files: ["src/scripts/**/*.js", "src/images/**/*.gif"],
                tasks: "copy",
                options: {
                    spawn: false,
                    livereload: true
                }
            },

            sass: {
                files: ["src/scss/**/*.scss"],
                tasks: "sass",
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            css: {
                files: ["css/**/*.css"],
                tasks: "postcss",
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: ["src/**/*.html", "src/**/*.njk"],
                tasks: ["clean:html", "nunjucks", "prettify"],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            gruntfile: {
                files: "gruntfile.js",
                options: {
                    spawn: false,
                    livereload: true,
                    reload: true
                }
            },
            data: {
                files: "data.json",
                tasks: ["clean:html", "nunjucks", "prettify"],
                options: {
                    spawn: false,
                    livereload: true,
                    reload: true
                }
            }
        },
        // Nunjucks task
        nunjucks: {
            options: {
                data: grunt.file.readJSON("data.json"),
                paths: "src/html"
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: "src/html",
                    src: [
                        "**/*.html"
                    ],
                    dest: "dist",
                    ext: ".html"
                }],
            }
        },
        // Clean task
        clean: {
            html: {
                src: ["dist/templates/**/*"]
            },
            css: {
                src: ["dist/css/**/*"]
            },
            all: {
                src: ["dist/**/*"]
            }
        },
        // Prettify task
        prettify: {
            options: {
                "indent": 1,
                "indent_char": " ",
                "wrap_line_length": 250,
                "brace_style": "collapse",
                "preserve_newlines": true,
                "condense": true,
                "max_preserve_newlines": 2,
                "unformatted": ["a", "code", "pre"]
            },
            all: {
                expand: true,
                cwd: "",
                src: ["templates/**/*.html"],
                dest: "",
                ext: ".html"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    // Load the plugins to run your tasks
    require("load-grunt-tasks")(grunt, {
        scope: "devDependencies"
    });
    require("time-grunt")(grunt);

    // Default task(s).
    grunt.registerTask("default", [
        "clean:all",
        "sass",
        "postcss",
        "nunjucks",
        "prettify",
        "copy",
        "watch"
    ]);
};
