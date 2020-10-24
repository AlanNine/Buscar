const readline = require('readline');
const fetch = require('node-fetch');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// https://api.github.com/users/
process.stdout.write('\033c');
rl.question("{?} - Qual é o nome do github?: ", function(github_name) {
    let url = `https://api.github.com/users/${github_name}`;
    let settings = { method: "get"};

    (async () => {
        const response = await fetch(url, settings);
        const json = await response.json();

        let user = {
            login: json['login'],
            nome: json['name'],
            id: json['id'],
            Tipo_de_conta: json['type'],
        };

        let account = {
            repositorios: json['public_repos'],
            gists: json['public_gists'],
            seguidores: json['followers'],
            seguindo: json['following'],
        };
        
        let info = {
            localização: json['location'],
            companhia: json['company'],
            email: json['email'],
            criado_em: json['created_at'],
        };

        process.stdout.write('\033c');

        console.log(user, '\n');
        console.log(account, '\n');
        console.log(info);

        rl.close();
    })();
});