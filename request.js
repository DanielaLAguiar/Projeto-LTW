const server = 'twserver.alunos.dcc.fc.up.pt';
const port = 9040;

async function request(func, init) {
    const url = `http://${server}:${port}/${func}`;
    const resp = await fetch(url, init);
    return resp;
}

async function register(name, password) {
    const init = {
        method: 'POST',
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
    return await request('join', init);
}

async function leave(name, password, game) {
    const init = {
        method: 'POST',
        body: JSON.stringify({
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

async function getRanking(div) {
    const init = {
        method: 'POST',
        body: JSON.stringify({})
    };
    const req = await request('classificacao', init);
    const data = await req.json();

    const ranking = data.ranking;
    let lista = Object.lista(ranking[0]);
    let texto = "<table><tr>";
    for (let i = 0; i < lista.length; i++) {
        texto += '<td><b>' + lista[i] + '</b></td>';
    }
    texto += "</tr>";

    for (let i = 0; i < ranking.length; i++) {
        texto += '<tr>';
        for (let j = 0; j < lista.length; j++) {
            texto += '<td>' + ranking[i][lista[j]] + '</td>';
        }
        texto += '</tr>';
    }
    texto += "</table>";
    div.innerHTML = texto;
}
