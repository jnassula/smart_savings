import { Formik, Field } from 'formik';
import React, { useEffect } from 'react';

function Lista (){

    const [listaDeItens, updateLista] = React.useState([])

    useEffect(() => {
      console.log(listaDeItens)
    })
  
  
    async function adicionarItem(item){
      updateLista(prevState => {
        const novoState = prevState.concat(item)
        return novoState
      })
      console.log("Adicionar item executado")
    }
    // Esta função assíncrona vai adicionarItem, recebendo o item. Chama o updateLista, com o estado anterior e fazemos concat ao item recebido pelo POST
    // Returnamos o novo estado, com o item adicionado.
    // Esta função é chamada onSubmit (o Formik faz a comunicação)
  
    function enviarMensagem(){
      fetch("/mensagem", {
        method: "POST"
      }).then(res => res.json()
      .then(json => console.log(json)))
      alert("Mensagem enviada a todos os elementos do grupo")
    }
  

    return (
        <div className="App">
          <>
          <ul>
            {listaDeItens.map(item => (
              <li
              key={item.id}
              ></li>
            ))}
          </ul>
          </>
    
    
          <Formik
            initialValues={{descricao: "", quantidade: "", unidade: "un"}}
            onSubmit={(values) => {
            fetch("/lista", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-type": "application/json"
              }
            }).then(res => res.json()
            .then(json => adicionarItem(json)))
          }}
          >
          
          {
            ({handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Field name="descricao" required />
                <Field name="quantidade" type="number" required />
                <Field name="unidade" as="select" required>
                 <option value="un">UN</option>
                 <option value="kg">KG</option>
                 <option value="lt">LT</option>
                 </Field>
                <button type = "submit">Adicionar item</button>
              </form>
            )
          }
          </Formik>
            <div>
              <p>
                <button onClick={enviarMensagem} type = "alert" >Vou às compras</button>
              </p>
            </div>
            
        </div>
    );
}

export default Lista