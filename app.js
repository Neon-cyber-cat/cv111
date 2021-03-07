const express = require('express');
const cors = require ("cors");
const app = express();
const dotenv = require ("dotenv");
const { request, response } = require('express');

dotenv.config();
//Cifra credenciales 

const dbService = require ('./dbService');
//junta a las funciones get, insert update delete de SQL



app.use(cors()); ///json api -> front 

app.use (express.json());
app.use (express.urlencoded( {extended : false} ));


//read
app.get('/getAll', (request, response) => {
        
        const db = dbService.getDbServiceInstance();
        
        const result = db.getAllData();

        result
        .then (data => response.json( {data:data}) )
        .catch (err=> console.log(err));

})


//create
app.post('/insert', (request,response) => {

    console.log (request.body);
    const {name} = request.body;
    const db = dbService.getDbServiceInstance();

    const result= db.insertNewName(name);
    result
        .then (data => response.json( {data:data}) )
        .catch (err=> console.log(err));



})

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

//search

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err))
    /*.then (db.shutdown());*/
    ;
})

/*
//create
app.post('/insert', (request,response) => {

    console.log (request.body);
    const {name} = request.body;
    const {name} = request.body;
    const {name} = request.body;
    const db = dbService.getDbServiceInstance();

    const result= db.pruebaInsertar(name);
    result
        .then (data => response.json( {data:data}) )
        .catch (err=> console.log(err));



})
*/

app.listen(process.env.PORT, () => console.log('app.js running ${PORT} ༼ つ ◕_◕ ༽つ'));
//monitorea act puerto + act app 