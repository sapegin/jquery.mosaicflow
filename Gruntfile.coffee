# gruntjs.com

module.exports = (grunt) ->
	"use strict"

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)

	source = "jquery.mosaicflow.js"

	grunt.initConfig
		cmpnt: grunt.file.readJSON('bower.json'),
		jshint:
			options:
				jshintrc: ".jshintrc"
			files: [source]
		jscs:
			main: [source]
		uglify:
			options:
				banner: "/*! jQuery Mosaic Flow v<%= cmpnt.version %> by Artem Sapegin - " +
						"http://sapegin.github.io/jquery.mosaicflow/ - Licensed MIT */\n"
			main:
				files:
					"jquery.mosaicflow.min.js": source

	grunt.registerTask "default", ["jshint", "jscs", "uglify"]
	grunt.registerTask "test", ["jshint", "jscs"]
	grunt.registerTask "build", ["uglify"]
