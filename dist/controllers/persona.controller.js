"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPersona = exports.postPersona = exports.deletePersona = exports.getPersona = exports.getPersonas = void 0;
const getPersonas = (req, res) => {
    res.json({
        msg: "getPersonas"
    });
};
exports.getPersonas = getPersonas;
const getPersona = (req, res) => {
    console.log(req.params.id);
    res.json({
        msg: "getPersona",
        id: req.params.id
    });
};
exports.getPersona = getPersona;
const deletePersona = (req, res) => {
    console.log(req.params.id);
    res.json({
        msg: "deletePersona",
        id: req.params.id
    });
};
exports.deletePersona = deletePersona;
const postPersona = (req, res) => {
    const { body } = req;
    console.log(req.body);
    res.json({
        msg: "postPersona",
        body: body
    });
};
exports.postPersona = postPersona;
const putPersona = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    res.json({
        msg: "putPersona",
        body: body,
        id: id
    });
};
exports.putPersona = putPersona;
