// Com o uso de yarn sucrase é possivel utilizar essa estrutura para importar os módulos.

import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import routes from './routes';
import path from 'path';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import Youch from 'youch';


import './database';

/* Essa é a sintaxe padrão para importar módulos.

const express = require('express');
const routes = require('./routes');
*/

class App {
	// Constructor é utilizado para automaticamente chamar outras funções a cada instância.

	constructor( ) {
		this.server = express( );

		Sentry.init(sentryConfig);
	
		this.middlewares( );
		this.routes( );
		this.exceptionHandler();
	}

	middlewares( ){
		this.server.use(Sentry.Handlers.requestHandler());
		this.server.use(express.json( ));
		this.server.use('/files',express.static(path.resolve(__dirname, '..', 'tmp','uploads'))
		);
	}

	routes( ){
		this.server.use(routes);
		this.server.use(Sentry.Handlers.errorHandler());
	}

	exceptionHandler(){
		this.server.use(async (err,req, res, next) =>{
			if(process.env.NODE_ENV == 'development'){
				const errors = await new Youch(err, req).toJSON();

				return res.status(500).json(errors);
			}

			return res.status(500).json({error:'Internal server error'});
		});
	}
}

//  module.exports = new App( ).server; -> Sintaxe padrão para exportar módulos.

export default  new App().server; // -> Sintaxe para exportar módulos com sucrase.