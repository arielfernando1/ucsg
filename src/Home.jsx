import LoginButton from "./LoginButton";
import "./index.css";

export default function Home() {
  return (
    <div className="centered">
      <h1>UCSG</h1>
      <img src="src/assets/logo.png" />
      <h1>Universidad Católica de Santiago de Guayaquil</h1>
      <h3>Ingresa para votar</h3>
      <LoginButton />
    </div>
  );
}
