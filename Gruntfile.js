module.exports = function(grunt) {
    // Initial configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            files: {
                options: {
                    banner: "'use strict';\n"
                },
                src: ['js/core/client_setting.js',
                      // libs
                      'js/lib/*.js',
                       // common type
                      'js/core/type.js',
                      // entity
                      'js/core/entity/entity.js',
                      'js/core/entity/humanoid.js',
                      'js/core/entity/multileg.js',
                      'js/core/entity/noleg.js',
                      'js/core/entity/item.js',
                      'js/core/entity/actor.js',
                      'js/core/entity/avatar.js',
                      // level
                      'js/core/level/tick_node.js',
                      'js/core/level/tile.js',
                      'js/core/level/terrain.js',
                      'js/core/level/level.js',
                      // ui
                      'js/core/ui/menu_item.js',
                      'js/core/ui/menu.js',
                      'js/core/ui/ui.js',
                      // asset
                      'js/core/asset/object_pool.js',
                      'js/core/asset/id_pool.js',
                      'js/core/asset/asset.js',
                      // gfx
                      'js/core/gfx/tile_sprite.js',
                      'js/core/gfx/wall_sprite.js',
                      'js/core/gfx/entity_sprite.js',
                      'js/core/gfx/ui_sprite.js',
                      'js/core/gfx/sprite_builder.js',
                      'js/core/gfx/overlay.js',
                      'js/core/gfx/map.js',
                      'js/core/gfx/gfx.js',
                      // sound
                      'js/core/sound/sound.js',
                      // game scenes
                      'js/core/scene/scene.js',
                      'js/core/scene/loading.js',
                      'js/core/scene/intro.js',
                      'js/core/scene/playing.js',
                      'js/core/scene/gameover.js',
                      'js/core/scene/ranking.js',
                      // main
                      'js/core/main.js'],
                dest: 'js/build/client.js'
            },
            dist: {
                options: {
                    banner: "'use strict';\n"
                },
                src: ['LICENSE',
                      'js/build/client.min.js'],
                dest: 'dist/rrll.min.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
//                 compress: true,
                preserveComments: 'some'
            },
            min: {
                files: {
                    'js/build/client.min.js': 'js/build/client.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/core/*/*.js', 'js/core/*.js'],
                tasks: ['concat:files', 'uglify', 'concat:dist']
            }
        },
	jasmine: {
	    pivotal: {
		src: 'js/build/client.js',
		options: {
		    specs: 'js/test/test_*.js',
//                     keepRunner: true,
		    summary: true
		}
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['concat:files', 'uglify', 'concat:dist', 'jasmine']);
    grunt.registerTask('build', ['concat:files', 'uglify', 'concat:dist']);
    grunt.registerTask('start', ['watch']);
};
