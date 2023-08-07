import { Link } from "react-router-dom";

{
  /* Cantidate card with all the information */
}

export default function Candidate(props) {
  const { id, name, photoUrl, list, proposals } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h2>{name}</h2>
      </div>
      <div className="card-body">
        <div className="card-body-left">
          <img src={photoUrl} alt="Candidato" />
          <h3>{list}</h3>
        </div>
        <div className="card-body-right">
        </div>
        <Link to={`/details/${id}`}>
          <button>Ver más</button>
        </Link>
      </div>
    </div>
  );
}
