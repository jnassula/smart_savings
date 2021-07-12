import express from "express"
import { createObjective, displayObjective } from "../services/objetivos"

const objetivosRouter = express.Router()

// GET /objetivos - Retorna todas os objetivos
objetivosRouter.get("/", async (req,res) => {
    try{
        res.status(200).json({
            Objetivos: await displayObjective()
        })
    }catch(err){
        console.log(err)
    }
})

objetivosRouter.post("/", async(req,res) => {
    try {
        const idDoObjetivo= await createObjective(req.body)
        res.status(201).json({
            Objetivo: req.body.obj,
            Prazo: req.body.prazo,
            Valor: req.body.valor,
            id: idDoObjetivo
        });
    }catch(err){
        console.log(err)
    }
})

export default objetivosRouter