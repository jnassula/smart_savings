import mongodb from 'mongodb';
import getCollection from './db'
const {ObjectId} = mongodb

// async function getList(id){
//     const collection = await getCollection(DB_NAME, "lista");
//     return  await collection.findOne({_id: ObjectId(id)})
// }


// Nesta função inserimos um item e passamos-lhe um item.
// A coleção é o resultado de passar a colecção que queremos pesquisar (lista)
// A resposta do nosso pedido é inserir um item na colecção /criar uma nova
// A FAZER: CRIAR UMA LISTA DE LISTAS
async function insertList(nomeDalista){
    const collection = await getCollection("smartSavings", "Compras");
    const res = await collection.insertOne(nomeDalista)
    console.log("Camada final a bombar")
    return res.insertedId
}

export default insertList