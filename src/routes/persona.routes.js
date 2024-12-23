import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/add', (req,res)=>{
    res.render('personas/add');
});
router.post('/add', async (req,res)=>{
    try {
        const {name, lastName, age} = req.body;
        const newPersona = {
            name,lastName,age
        }
        await pool.query('insert into personas SET ?', [newPersona]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM personas');
        res.render('personas/list',{personas:result});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/edit/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const [persona] = await pool.query('Select * from personas where id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit',{
            persona:personaEdit
        });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/edit/:id', async(req,res)=>{
    try {
        const {name, lastName, age} = req.body;
        const {id} = req.params;
        const editPersona = {
            name, lastName, age
        };
        await pool.query('update personas set ? where id = ?', [editPersona, id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/delete/:id',async (req,res)=>{
    try {
        const {id}  =req.params;
        await pool.query('delete from personas where id = ?',[id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

export default router;
