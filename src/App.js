import { useState } from 'react';
import {FiSearch} from 'react-icons/fi'
import './App.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [mensagem, setMensagem] = useState('')

  

  async function handleSearch(){
    if(input === ''){
      setMensagem("Preencha algum CEP!")
      return;
    }
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } 
    catch{
      setMensagem("Ops! Erro ao buscar o CEP informado. Verifique o CEP e digite novamente!")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>
      <div className='containerInput'>

      <input
        type='text'
        placeholder='Digite seu CEP'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

      <button className='buttonSearch' onClick={handleSearch}>
        <FiSearch size={15} color="#FFF" />
      </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <div className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </div>
      )}
      <h3>{mensagem}</h3>
    </div>
  );
}

export default App;
