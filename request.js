const server = 'http://twserver.alunos.dcc.fc.up.pt';
const port = 8008;

async function request(func, init) {
    const url = `${server}:${port}/${func}`;
    const resp = fetch(url, init).catch(function() {console.log("nope")});
    return resp;
}

async function register(name, password) {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }, 
        body: JSON.stringify({
            'name': name,
            'password': password,
        })
    };
    const req = await request('register', init);
    return req;
}

async function update(name, game, funct, errFunct) {
    const url = new URL(`http://${server}:${port}/update`);
    let params = [
        ['name', name],
        ['game', game],
    ];
    url.search = new URLSearchParams(params).toString();

    const source = new EventSource(url)
    source.onerror = errFunct
    source.onmessage = funct
    return source;
}

async function join(name, password, size, initial) {
    const init = {
        method: 'POST',
        body: JSON.stringify({
            'name': name,
            'password': password,
            'size': size,
            'initial': initial
        })
    };
    let req = await request('join', init);
    return req;
}

async function leave(name, password, game) {
    const init = {
        method: 'POST',
        body: JSON.stringify({
            'group': group,
            'name': name,
            'password': password,
            'game': game
        })
    };
    let req = await request('leave', init);
    return req;
}

async function notify(name, password, game, move) {
    const init = {
        method: 'POST',
        body: JSON.stringify({
            'name': name,
            'password': password,
            'game': game,
            'move': move
        })
    };
    let req = await request('notify', init);
    return req;
}