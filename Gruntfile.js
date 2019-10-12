/*
 *     File: Gruntfile.js
 *     Project: messenger-bot-pl
 *     Copyright (C) 12/10/2019, 18:58  Mikołaj Bogucki
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this file.  If not, see https://www.gnu.org/licenses/.
 */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['./build'],
        exec: {
            buildTS: {
                 cmd: "tsc --project tsconfig.json"
            },
            run:{
                cmd: "node ./build/app.js"
            }
        },


    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'exec:buildTS','exec:run']);
    grunt.registerTask('build', ['clean', 'exec:buildTS'])

};
