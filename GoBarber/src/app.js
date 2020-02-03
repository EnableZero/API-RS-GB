// Com o uso de yarn sucrase é possivel utilizar essa estrutura para importar os módulos.

import express from 'express';
import routes from './routes';
import path from 'path';

import './database';

/* Essa é a sintaxe padrão para importar módulos.

const express = require('express');
const routes = require('./routes');
*/

class App {
	// Constructor é utilizado para automaticamente chamar outras funções a cada instância.

	constructor( ) {
		this.server = express( );
	
		this.middlewares( );
		this.routes( );
	}

	middlewares( ){
		this.server.use(express.json( ));
		this.server.use('/files',express.static(path.resolve(__dirname, '..', 'tmp','uploads'))
		);
	}

	routes( ){
		this.server.use(routes)
	}
}

//  module.exports = new App( ).server; -> Sintaxe padrão para exportar módulos.

export default  new App().server; // -> Sintaxe para exportar módulos com sucrase.