import LoginButton from "./LoginButton";
import "./index.css";

export default function Home() {
  return (
    <div className="centered">
      <h1>Universidad Católica de Santiago de Guayaquil</h1>
      <img src="logo.png" />
      <h3>Ingresa para votar</h3>
      <LoginButton />
    </div>
  );
}
