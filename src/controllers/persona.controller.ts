
import { Request, Response} from 'express'

export const getPersonas = (req: Request, res: Response) => {

    res.json({
        msg: "getPersonas"
    });
};

export const getPersona = (req: Request, res: Response) => {

    console.log(req.params.id)
    res.json({
        msg: "getPersona",
        id:req.params.id 
    });
};

export const deletePersona = (req: Request, res: Response) => {

    console.log(req.params.id)
    res.json({
        msg: "deletePersona",
        id:req.params.id 
    });
};

export const postPersona = (req: Request, res: Response) => {
    const{body} =req;

    console.log(req.body);
    res.json({
        msg: "postPersona",
        body: body
    });
};

export const putPersona = (req: Request, res: Response) => {

    const{body} =req;
    const{id} = req.params;
    res.json({
        msg: "putPersona",
        body: body,
        id: id
    });
};