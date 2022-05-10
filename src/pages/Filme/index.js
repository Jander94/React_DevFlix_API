import {useEffect, useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme.css'
import { toast } from 'react-toastify'

function Filme(){
   const { id } = useParams(); 
   const navigate = useNavigate();
   const [filme, setFilme] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(()=>{
       async function loadFilme(){
        await api.get(`/movie/${id}`, {
            params:{
                api_key: '643494e9505ba0001f7c3b941502ce3a',
                language: 'pt-BR',
            }
        })
        .then((response)=>{
            setFilme(response.data);
            setLoading(false);
        })
        .catch(()=>{
            navigate('/', {replace:true})
            return;
        }) 
       }
       loadFilme();

       return ()=>{
           console.log('Componente desmontado')
       }
   }, [navigate, id])

   function salvarFilme(){
        const minhaLista = localStorage.getItem('@devflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)
        if(hasFilme){
            toast.warn('Este filme já esta na lista');
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem('@devflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso')
        
   };

   if(loading){
       return(
           <div className='filme-info'>
               <h2>Carregando detalhes...</h2>
           </div>
       );
   }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div>
                <button onClick={salvarFilme} className='Btnsalvar'>Salvar</button>                
                <a target='blank' rel='external' className='Btntrailer' href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>                
            </div>
        </div>
    );
};
export default Filme;