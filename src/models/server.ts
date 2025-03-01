import express from 'express';
import routesPersonas  from '../routes/persona.routes';


class Server {
    private app: express.Application;
    private port: string;

    constructor(){

        this.app = express();
        this.port = process.env.PORT || '4000'
        this.middlewares() //llamar siempre antes del routes
        this.routes();
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


}

export default Server;