import LoginButton from "./LoginButton";
import "./index.css";

export default function Home() {
  {
    /*Centered div*/
  }
  return (
    <div className="centered">
      <h1>UCSG</h1>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Logo_UCSG.svg" />
      <h2>Elecciones 2023</h2>
      <h3>Ingresa para votar</h3>
      <LoginButton />
    </div>
  );
}
