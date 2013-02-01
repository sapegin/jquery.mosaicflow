# gruntjs.com

module.exports = (grunt) ->
	"use strict"

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)

	grunt.initConfig
		cmpnt: grunt.file.readJSON('component.json'),
		jshint:
			options:
				jshintrc: ".jshintrc"
			files: [
				"jquery.mosaicflow.js"
			]
		uglify:
			options:
				banner: "/*! jQuery Mosaic Flow v<%= cmpnt.version %> by Artem Sapegin - " +
						"http://sapegin.github.com/jquery.mosaicflow/ - Licensed MIT */\n"
			main:
				files:
					"jquery.mosaicflow.min.js": "jquery.mosaicflow.js"

	grunt.registerTask "default", ["jshint", "uglify"]
