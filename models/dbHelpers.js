const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);
const db_two = require("../config/db");

module.exports = {
    add,
    addproduct
}

async function add(newmsg){
    try {
        const [id] = await db('messages').insert(newmsg);
        return id;
    }
    catch(err){
        console.log("HOLA")
        if(err.code === 'SQLITE_ERROR')
            await db.schema.createTable('messages', table => {
              table.increments(); // Me va aumentando el id 
              table.text('email', 128).notNullable();
              table.text('mensaje', 128).notNullable();
              table.timestamps(true, true);
            })
        await db('messages').insert(newmsg);
    }
}

async function addproduct(newproduct){
    try {
        await db_two('products').insert(newproduct);
    } 
    catch(err){
        console.log(err)
    }
}
