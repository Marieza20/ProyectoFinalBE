import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Pastelito from '../img/Pastelito.png'
import '../styles/Nav.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from "./AuthContext"; // Importa el hook del contexto

function Nav({ abrirMenu }) {
    const location = useLocation();
    const [lineaEstilo, setLineaEstilo] = useState({});
    const menuRef = useRef();
    const { user } = useAuth(); // Usa el contexto aquí

    useEffect(() => {
        const links = menuRef.current.querySelectorAll(".Link");
        const activeLink = Array.from(links).find(
            (link) => link.pathname === location.pathname
        );

        if (activeLink) {
            const { offsetLeft, offsetWidth } = activeLink;
            setLineaEstilo({
                left: offsetLeft,
                width: offsetWidth,
            });
        }
    }, [location]);

    return (
        <div>
            <nav className="nav scroll">
                <div className='menu'>
                    <div className='IMG'>
                        <Link className='Link' to={"/"}><img src={Pastelito} alt="" /></Link>
                    </div>
                    <ul className='elementosMenu' ref={menuRef}>
                        <Link className="Link" to={"/"}>Inicio</Link>
                        <Link className="Link" to={"/feed"}>Feed</Link>
                        <Link className="Link" to={"/sobreNosotros"}>Nosotros</Link>
                        <Link className="Link" to={"/contactos"}>Contactos</Link>
                        <div className="linea" style={lineaEstilo}></div>
                    </ul>
                    <div className='iconos'>
                        <i className="bi bi-list" onClick={abrirMenu}></i>
                        {user ? (
                            <Link className='Link' to={"/perfil"}>b
                                <i className="bi bi-person-circle"></i>
                            </Link>
                        ) : (
                            <Link className='Link' to={"/login"}>
                                <i className="bi bi-person"></i>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav