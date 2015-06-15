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
                      'js/core/menu_content.js',
                      // entity
                      'js/core/entity/entity.js',
                      'js/core/entity/item.js',
                      'js/core/entity/actor.js',
                      // level
                      'js/core/level/tick_node.js',
                      'js/core/level/tile.js',
                      'js/core/level/terrain.js',
                      'js/core/level/level.js',
                      // ui
                      'js/core/ui/avatar.js',
                      'js/core/ui/button.js',
                      'js/core/ui/panel.js',
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
                      'js/core/gfx/humanoid.js',
                      'js/core/gfx/multileg.js',
                      'js/core/gfx/noleg.js',
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
                      'js/core/scene/sandbox.js',
                      'js/core/scene/menu.js',
                      'js/core/scene/gameover.js',
                      'js/core/scene/ranking.js',
                      'js/core/scene/scene_stack.js',
                      // main
                      'js/core/main.js'],
                dest: 'js/build/client.js'
            },

            core: {
                src: [// common type
                      'js/core/type.js',
                      'js/core/menu_content.js',
                      // entity
                      'js/core/entity/entity.js',
                      'js/core/entity/item.js',
                      'js/core/entity/actor.js',
                      // level
                      'js/core/level/tick_node.js',
                      'js/core/level/tile.js',
                      'js/core/level/terrain.js',
                      'js/core/level/level.js',
                      // ui
                      'js/core/ui/avatar.js',
                      'js/core/ui/button.js',
                      'js/core/ui/panel.js',
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
                      'js/core/gfx/humanoid.js',
                      'js/core/gfx/multileg.js',
                      'js/core/gfx/noleg.js',
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
                      'js/core/scene/sandbox.js',
                      'js/core/scene/menu.js',
                      'js/core/scene/gameover.js',
                      'js/core/scene/ranking.js',
                      'js/core/scene/scene_stack.js',
                      // main
                      'js/core/main.js'],
                dest: 'js/build/core.es6.js'
            },

            bundle: {
                src: ['js/core/client_setting.js',
                      'js/lib/*.js',
                      'js/build/core.es5.js'],
                dest: 'js/build/client.es5.js'
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

        // ES6
        babel: {
            options: {
                sourceMap: true
//                 compact: false
            },
            dist: {
                files: {
                    "js/build/core.es5.js": "js/build/core.es6.js"
                }
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
            },
            es6: {
                files: {
                    'js/build/client.min.js': 'js/build/client.es5.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/core/*/*.js', 'js/core/*.js'],
                tasks: ['build']
                // tasks: ['concat:files', 'uglify', 'concat:dist'] es5
            }
        },
        jasmine: {
            pivotal: {
                src: 'js/build/client.js',
                options: {
                    specs: 'js/test/test_*.js',
                    // keepRunner: true,
                    summary: true
	        }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['concat:files', 'uglify', 'concat:dist', 'jasmine']);
    grunt.registerTask('es5', ['concat:files', 'uglify', 'concat:dist']);

    grunt.registerTask('build', ['concat:core', 'babel:dist', 'concat:bundle', 'uglify:es6', 'concat:dist']);

    grunt.registerTask('start', ['watch']);
};
