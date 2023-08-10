import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Candidate(props) {
  const { id, name, photoUrl, list, proposals } = props;
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    async function fetchVotes() {
      try {
        const response = await axios.get(
          `http://localhost/api/candidates/${id}/votes`
        );
        console.log(response.data.votes);
        setVotes(response.data.votes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVotes();
  }, [id]);
  return (
    <div className="card">
      <div className="card-header">
        <h2>{name}</h2>
      </div>
      <div className="card-body">
        <div className="card-body-left">
          <img src={photoUrl} alt="Candidato" />
          <h3>{list}</h3>
          <p>
            {votes} {votes == 1 ? "Voto" : "Votos"}
          </p>
        </div>
        <div className="card-body-right"></div>
        <Link to={`/details/${id}`}>
          <button>Ver más</button>
        </Link>
      </div>
    </div>
  );
}
