import {Link} from 'react-router-dom';
import './header.css'

function Header(){
    return(
        <div id='centro'>
            <header>
                <Link className='logo' to='/'>DevFlix</Link>
                <Link className='favoritos' to='/favoritos'> Meus Filmes</Link>
            </header>
        </div>
    );
};
export default Header;