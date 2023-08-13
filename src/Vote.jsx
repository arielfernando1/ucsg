import { GiVote } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AiOutlineSelect } from "react-icons/ai";

export default function Vote() {
  return (
    <>
      <h1>
        <GiVote /> Elige un Consejo
      </h1>
      <div className="candidate-list">
        <div className="card">
          <div className="card-header">
            <h1>Consejo Universitario</h1>
          </div>
          <div className="card-body">
            <img src="src/assets/01.png" alt="c1" />
          </div>
          <Link to={`/foo/1`}>
            <button>
              {" "}
              <AiOutlineSelect /> Elegir
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h1>Consejo Directivo</h1>
          </div>
          <div className="card-body">
            <img src="src/assets/02.png" alt="c2" />
          </div>
          <Link to={`/foo/2`}>
            <button>
              <AiOutlineSelect /> Elegir
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
