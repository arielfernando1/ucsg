import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function Details() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth0();

  const handleVote = async () => {
    if (!isVoting && !hasVoted) {
      setIsVoting(true);
      try {
        const response = await axios.post(
          `http://132.145.173.211:5000/api/candidates/${id}/vote`,
          {
            votantId: user.email,
          }
        );
        if (response.status === 200) {
          setHasVoted(true);
        }
      } catch (error) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message);
        } else {
          console.log(error);
        }
      } finally {
        setIsVoting(false);
      }
    }
  };

  useEffect(() => {
    async function fetchCandidate() {
      try {
        const response = await axios.get(
          `http://132.145.173.211:5000/api/candidates/${id}`
        );
        setCandidate(response.data);
        setIsLoading(false);
        setHasVoted(response.data.hasVoted);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCandidate();
  }, [id]);

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
            <button onClick={handleVote} disabled={isVoting || hasVoted}>
              {isVoting ? "Votando..." : hasVoted ? "Votado" : "Votar"}
            </button>
            {errorMessage && <p>{errorMessage}</p>}
            {hasVoted && <p>Voto establecido correctamente</p>}
          </div>
        )
      )}
    </div>
  );
}
