"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persona_controller_1 = require("../controllers/persona.controller");
const router = (0, express_1.Router)();
// Obtener todas las personas
router.get('/', persona_controller_1.getPersonas);
// Obtener una persona por ID
router.get('/:id', persona_controller_1.getPersona);
// Crear una nueva persona
router.post('/', persona_controller_1.postPersona);
// Actualizar una persona por ID
router.put('/:id', persona_controller_1.putPersona);
// Eliminar una persona por ID
router.delete('/:id', persona_controller_1.deletePersona);
exports.default = router;
