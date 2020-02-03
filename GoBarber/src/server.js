//const app = require('./app'); -> Sintaxe padrão

import app from './app'; // ->Sintaxe com sucrase ( yarn add sucrase)

app.listen(3333);

//Para fazer nodemon funcionar com sucrase também é preciso de nodemon.json