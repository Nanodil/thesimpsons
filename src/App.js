import logo from "./logo.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Frase from "./components/Frase";
import Spinner from "./components/Spinner";
import { useState, useEffect } from "react";

function App() {
  const [personaje, setPersonaje] = useState({});
const [carga, setCarga] =useState(false);
  useEffect(() => {
    consultarAPI();
  },[]);

  const consultarAPI = async() => {
    setCarga(false);
    const respuesta = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes");
    const dato = await respuesta.json();
    console.log(respuesta);
    console.log(dato[0]);
    setTimeout(()=> {
      //guardar en el state
      setPersonaje(dato[0]);
      //mostrar el componente frase
      setCarga(true);

    }, 1500);
  };
//operador ternario
// (condicion logica)?(codigo a ejecutar cuando es verdadera):(codigo cuando la condicion es falsa)
  const mostrarComponente = (carga === true)?(<Frase personaje={personaje}></Frase>):(<Spinner/>)

  return (
    <section className="container my-5 d-flex flex-column align-items-center">
      <img src={logo} alt="logo de los simpsons" width={300} />
      <Button variant="warning" className="my-5 w-25" onClick={()=> consultarAPI()}>Obtener frase</Button>
      {mostrarComponente}
    </section>
  );
}

export default App;
