import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidate() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/candidates/${id}`
        );
        setCandidate(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCandidate();
  }, [id]);

  console.log(candidate);
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        candidate && (
          <div className="details">
            <div>
              <img src={candidate.photoUrl} alt="Candidato" />
              <h2>{candidate.name}</h2>
            </div>
            <div className="card-body">
              <div className="card-body-left"></div>
              <p>{candidate.proposals}</p>
            </div>
            <button>Votar por {candidate.name}</button>
          </div>
        )
      )}
    </div>
  );
}
