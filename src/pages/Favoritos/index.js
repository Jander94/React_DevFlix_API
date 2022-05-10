import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify'

function Favoritos(){
    const [filmes, setFilmes] = useState([]);
    useEffect(()=>{
        const minhaLista = localStorage.getItem('@devflix');
        setFilmes(JSON.parse(minhaLista) || []);
    }, [])

    function excluirFilme(id){
        let filtroFimes = filmes.filter((item) => {
            return(item.id !== id)
        })
        setFilmes(filtroFimes)
        localStorage.setItem('@devflix', JSON.stringify(filtroFimes))
        toast.success('Filme excluido com sucesso')
    }

    return(
        <div className='meusFilmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title}/>
                            <span>{item.title}</span>
                            <div>
                            <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                            <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                );
                })}
            </ul>
        </div>
    );
}
export default Favoritos;
