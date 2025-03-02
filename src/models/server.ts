import express from 'express';
import routesPersonas  from '../routes/persona.routes';
import connection from '../db/connection';


class Server {
    private app: express.Application;
    private port: string;

    constructor(){

        this.app = express();
        this.port = process.env.PORT || '4000'
        this.middlewares() //llamar siempre antes del routes
        this.routes();
        this.conectarDB(); //conexion base de datos
    }

    listen(){
    this.app.listen(this.port, () =>{
        console.log('Aplicacion corriendo por el puerto', this.port)
    })

    }

    middlewares(){
        //parseo del body
        this.app.use(express.json())


    }

    routes (){
        this.app.use('/api/personas',routesPersonas)
    }

    //esto es base de datos
    conectarDB(){
        connection.connect((err) => {

            if(err) throw err;
            console.log('CONECTADO A BASE DE DATOS, BEIBEEEE')

        })
    }


}

export default Server;