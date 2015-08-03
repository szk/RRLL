module.exports = function(grunt) {
    // Initial configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            client: {
                src: ['js/common.js', // common type
                      'js/client/menu_content.js',
                      // entity
                      'js/client/entity/entity.js',
                      'js/client/entity/item.js',
                      'js/client/entity/actor.js',
                      'js/client/entity/humanoid.js',
                      'js/client/entity/multileg.js',
                      'js/client/entity/noleg.js',
                      // level
                      'js/client/level/tick_node.js',
                      'js/client/level/tile.js',
                      'js/client/level/terrain.js',
                      'js/client/level/level.js',
                      // ui
                      'js/client/ui/avatar.js',
                      'js/client/ui/ui.js',
                      // asset
                      'js/client/asset/object_pool.js',
                      'js/client/asset/id_pool.js',
                      'js/client/asset/asset.js',
                      // gfx
                      'js/client/gfx/entity_sprite.js',
                      'js/client/gfx/tile_sprite.js',
                      'js/client/gfx/wall_sprite.js',
                      'js/client/gfx/ui_sprite.js',
                      'js/client/gfx/appearance.js',
                      'js/client/gfx/overlay.js',
                      'js/client/gfx/map.js',
                      'js/client/gfx/gfx.js',
                      // sound
                      'js/client/sound/sound.js',
                      // game scenes
                      'js/client/scene/scene.js',
                      'js/client/scene/loading.js',
                      'js/client/scene/intro.js',
                      'js/client/scene/playing.js',
                      'js/client/scene/sandbox.js',
                      'js/client/scene/menu.js',
                      'js/client/scene/gameover.js',
                      'js/client/scene/ranking.js',
                      'js/client/scene/scene_stack.js',
                      // network
                      'js/client/net/net.js',
                      // bootstrap and mainloop
                      'js/client/rrll_client.js'],
                dest: 'js/build/client.es6.js'
            },
            client_bundle: {
                src: ['LICENSE',
                      'js/client/client_setting.js',
                      'js/lib/*.js',
                      'js/build/client.es5.js'],
                dest: 'dist/rrll_cl.js'
            },

            server: {
                src: ['js/common.js',
                      // db
                      'js/server/db/db.js',
                      // procedural content generator
                      'js/server/procgen/proclevel.js',
                      'js/server/procgen/procgen.js',
                      // net
                      'js/server/net/socket.js',
                      'js/server/net/web.js',
                      'js/server/net/net.js',
                      // world
                      'js/server/world/world.js',
                      // bootstrap and mainloop
                      'js/server/rrll_server.js'],
                dest: 'js/build/server.es6.js'
            },
            server_bundle: {
                src: ['LICENSE',
                      'js/server/server_setting.js',
                      // 'js/lib/*.js',
                      'js/build/server.es5.js'],
                dest: 'dist/rrll_sv.js'
            }
        },

        // ES6
        babel: {
            options: {
                // sourceMap: true
                // compact: false
            },
            dist: {
                files: {
                    "js/build/client.es5.js": "js/build/client.es6.js",
                    "js/build/server.es5.js": "js/build/server.es6.js"
                }
            }
        },

        uglify: {
            options: {
                preserveComments: 'some',
                sourceMap: true
                // mangle: true
                // compress: { drop_console: true }
            },
            es5: {
                options: { banner: "'use strict';" },
                files: {
                    'dist/rrll_cl.min.js': 'dist/rrll_cl.js',
                    'dist/rrll_sv.min.js': 'dist/rrll_sv.js'
                }
            }
        },
        watch: {
            options: {
                // spawn: false
                livereload: true
            },
            scripts: {
                files: ['js/*.js',
                        'js/client/*/*.js', 'js/client/*.js',
                        'js/server/*/*.js', 'js/server/*.js'],
                tasks: ['build']
            }
        },
        shell: {
            start: {
                command: 'npm start'
            }
        },

        jasmine: {
            pivotal: {
                src: 'js/build/rrll_cl.js',
                options: {
                    specs: 'js/test/test_*.js',
                    summary: true
                    // keepRunner: true,
	        }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['concat:client', 'babel:dist', 'concat:client_bundle', 'uglify:es5',
                                   'jasmine']);
    grunt.registerTask('build',
                       ['concat:client', 'concat:server', 'babel:dist',
                        'concat:client_bundle', 'concat:server_bundle',
                        'uglify:es5']);

    grunt.registerTask('start', ['shell:start', 'watch']);
};
