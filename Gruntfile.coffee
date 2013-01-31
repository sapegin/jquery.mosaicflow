# gruntjs.com

#jshint node:true
module.exports = (grunt) ->
	"use strict"

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)

	# Project configuration
	grunt.initConfig
		stylus:
			compile:
				options:
					"include css": true,
					paths: [
						"blocks"
					]
				files:
					"build/styles.css": "styles/index.styl"
		imgo:
			images:
				src: "images/*",
				skip: require("os").platform() == "win32"
		watch:
			stylus:
				files: "styles/**",
				tasks: "stylus"


	# Project tasks
	grunt.registerTask "default", ["imgo", "stylus"]
