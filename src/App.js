import './App.css';
import {useEffect, useState} from 'react';


function App() {

  const [tarefas, setTarefas] = useState([
        /*  {
            id:0,
            tarefa:'minha tarefa do dia',
            finalizada:false
          },
          {
            id:0,
            tarefa:'tarefa do dia 2',
            finalizada:true
          }*/
  ]);
  const[modal, setModal] = useState(false);

  const salvarTarefa = () =>{
    //todo: salvar tarefa
    var tarefa = document.getElementById('content-tarefa').value;
    setTarefas([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa,
        finalizada:false
      }


    ]);

    window.localStorage.setItem('tarefas',JSON.stringify([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa,
        finalizada:false
      }


    ]));

    setModal(false);


  }


 

  const abrirModal = () =>{
    setModal(!modal);
  }

  const marcarConcluida = (id,opt) =>{
    let novastarefas = tarefas.filter(function(val){
      if(val.id == id){
        val.finalizada=opt;
      }
      return val;
    })
    setTarefas(novastarefas);
    window.localStorage.setItem('tarefas', JSON.stringify(novastarefas));
  }





  useEffect(()=>{
    if(window.localStorage.getItem('tarefas') != undefined){
      setTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
    }
  })

  return (
    <div className="App">

      {
        modal?
        <div className="modal">
          <div className="modalContent">
          <h3>Adicione sua tarefa</h3>
          <input id="content-tarefa" type="text"/>
          <button onClick={()=>salvarTarefa()}>Salvar</button>
          </div>{/* modalContatent */}
        </div>
        :
        <div></div>
      }

      <div onClick={()=>abrirModal()} className="addTarefas">+</div>
      <div className="boxTarefas">
        <h2>Minha Tarafas do Dia!</h2>
        {
          tarefas.map((val)=>{
            if(!val.finalizada){
              return(
               
                <div>
                  <p onClick={()=>marcarConcluida(val.id,true)}>{val.tarefa} </p>
                 
                </div>                
              );
            }else{
              return(
                <div>
                   <p onClick={()=>marcarConcluida(val.id,false)} style={{textDecoration:'line-through'}}>{val.tarefa}</p>
                 
                  
                
                   </div>
              );
            }
          })
        }

      </div>{/* box-anotacoes */}
    </div>
  );
}

export default App;
