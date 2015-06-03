# -*- coding:utf-8 -*-
from bottle import route, run, template, request, static_file, response, url
from json import dumps

@route('/<filename:re:.*\.ico>')
def send_ico(filename):
    return static_file(filename, root='../img', mimetype='image/x-icon')

@route('/img/<filename:re:.*\.png>')
def send_image(filename):
    return static_file(filename, root='../img', mimetype='image/png')

@route('/js/<filename:re:.*\.min.js>')
def send_minjs(filename):
    return static_file(filename, root='../dist', mimetype='text/javascript')

@route('/css/<filename:re:.*\.css>')
def send_css(filename):
    return static_file(filename, root='../dist', mimetype='text/css')

@route('/js/<filename:re:.*\.js>')
def send_js(filename):
    return static_file(filename, root='../js', mimetype='text/javascript')

@route('/data/<filename:re:.*\.json>')
def send_json(filename):
    return static_file(filename, root='../data', mimetype='application/json')

@route('/data/<filename:re:.*\.atlas>')
def send_atlas(filename):
    return static_file(filename, root='../data', mimetype='application/data')

@route('/data/<filename:re:.*\.png>')
def send_atlas_img(filename):
    return static_file(filename, root='../data', mimetype='image/png')

# reference
@route('/static/<filename:path>')
def send_static(filename):
    return static_file(filename, root='/path/to/static/files')

@route('/')
def index():
    output = template('index')
    return output

@route('/image')
def image():
    rv = {"":""}
    response.content_type = 'application/json'
    return dumps(rv)

@route('/ui')
def ui():
    rv = {"controll": [{"defaultavatar": {"x": "1", "y": "12"}},]}
    response.content_type = 'application/json'
    return dumps(rv)

@route('/level')
def level():
    rv = {"avatar": [{"defaultavatar": {"x": "1", "y": "12"}},
                     {"advancedavatar": {"x": "1", "y": "12"}}],
          "terrain": [{"name": "defaultmap",
                       "tile": {".":{"":"", "":""},
                                "O":{"":"", "":""}},
                       "chip": ["..................................................",
                                "..................................................",
                                "..OOOOOOOOOOOOOOO..OOOOOOOO..........OOOOOOOOOOO..",
                                "..O.............O..O......O..........O.........O..",
                                "..O.............O..O......O..OOOOOO..O.........O..",
                                "..OOOOOOOOOOOO..O..OOOOOOOO..O....O..OOOOOOOOOOO..",
                                ".............O..O............O....O...............",
                                ".............OOOO............O....OOOOOOOOO.......",
                                "..OOOOOOOOO........OOOOOOOO..O............O.......",
                                "..O.......O........O......O..O............O.......",
                                "..O.......OOOOOOO..O...O..O..OOOOOOOOOOOOOO.......",
                                "..O.............O..O..OOO.O.......................",
                                "..O.............O..O...O..O..OOOOOOOOOOOOOOOOO....",
                                "..O.............O..O...O..O..O...............O....",
                                "..O.............O..O......O..O....O..........O....",
                                "..O.............O..OOOOOOOO..O.OOOOO.........O....",
                                "..OOOOOOOOOOOOOOO............O....O..........O....",
                                ".............................O...............O....",
                                ".............................OOOOOOOOOOOOOOOOO....",
                                "..OOOOOOOOO..OOOOOOOO.............................",
                                "..O.......O..O......O.............................",
                                "..O.......O..O......O........OOOOOOO.OOOOOOOO.OOO.",
                                "..O.......O..O......O........O.....O.O......O.O.O.",
                                "..OOOOOOOOO..O......OOOOOOO..O.....O.O......O.O.O.",
                                ".............O............O..O.....O.O......O.O.O.",
                                ".............O............O..OOOOOOO.O......O.O.O.",
                                "..OOOOOOOOO..O............O..........O......O.OOO.",
                                "..O.......O..O............O..........OOOOOOOO.....",
                                "..O.......O..OOOOOOOOOOOOOO..OOOOOOO..............",
                                "..O.......O..................O.....O..............",
                                "..O.......O..................O.....O..............",
                                "..O.......O..OOOOOOOOOOOOOOOOO.....OOOOOOOOOOOOO..",
                                "..OOOOOOOOO..O.................................O..",
                                ".............O.................................O..",
                                ".............OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO..",
                                "..OOOOOOOOO.......................................",
                                "..O.......O..OOOO..OOOOOOOOOOOOOOOOOOOO..OOOOOOO..",
                                "..O.......O........O..................O..O.....O..",
                                "..O.......OOOOOOO..O..................O..O.....O..",
                                "..O.............O..OOOOOOOOOOOOOOOOOOOO..O.....O..",
                                "..OOOOOOOOOOOOOOO........................O.....O..",
                                ".........................................O.....O..",
                                "...................OOOOOOOOOOOOOOOOOOOO..OOOOOOO..",
                                "..OOOOOOOOOOOOOOO..O..................O.......OO..",
                                "..O.............O..O..................O.OOOOO.OO..",
                                "..O.............O..OOOOOOOOOOOOOOOOOOOO.O...O.OO..",
                                "..O.............O.......................O...O.....",
                                "..OOOOOOOOOOOOOOO.......................OOOOO.....",
                                "..................................................",
                                ".................................................."],
                       "blank_texture_id": "1",
                       "fg_texture_id": "1",
                       "bg_texture_id": "0"}],

          "actor": [{"human": {"appearance": "humanoid", "health": "10", "energy": "20"}},
                    {"dog": {"appearance": "multileg", "health": "10", "energy":"20"}},
                    {"worm": {"appearance": "noleg", "health": "5", "energy":"20"}}
                    ],
          "item": [{"sword": {"weight": "mogera"}},
                   {"shield": {"weight": "mogera"}},
                   ],
          "level": [{"name": "defaultlevel", "width": "54", "height": "54", "texture_id": "1",
                     "avatar": {"defaultavatar": [{"x": "12", "y": "12"}]},
                     "actor": {"human": [{"name": "taro", "x": "5", "y": "4"}],
                               "dog": [{"name": "jiro", "x": "10", "y": "5"}]},
                     "item": {"sword": [{"x": "6", "y":"3"}],
                              "shield": [{"x": "7", "y": "2"}]},
                     },
                    # moge map
                    {"name": "moge", "width": "54", "height": "54", "texture_id": "1"}],
          }
    response.content_type = 'application/json'

    return dumps(rv)

@route('/help')
def help():
    return static_file('index.html', root='..')

@route('/hello/<name>')
def hello(name):
    rv = [{ "id": 1, "name": "Test Item 1" }, { "id": 2, "name": "Test Item 2" }]
    response.content_type = 'application/json'
    return dumps(rv)


run(host='localhost', port=8080, reloader=True)
