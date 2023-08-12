/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

export default function Candidate(props) {
  const { id, name, photoUrl, proposals, party_id } = props;
  const [isVoting, setIsVoting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false); // Initialize hasVoted state
  const { user } = useAuth0();

  useEffect(() => {
    async function fetchVotesAndCheckVoteStatus() {
      try {
        const response = await axios.get(
          `http://132.145.173.211:5000/api/candidates/${id}/votes`
        );
        setVotes(response.data.votes);

        // Check if the user has voted using the /api/:id/hasvoted endpoint
        const hasVotedResponse = await axios.get(
          `http://132.145.173.211:5000/api/${user.email}/hasvoted/${party_id}`
        );

        if (hasVotedResponse.status === 200) {
          setHasVoted(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchVotesAndCheckVoteStatus();
  }, [id, user.email]);

  const handleVote = async () => {
    if (isVoting || hasVoted) return;

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
        setVotes((prevVotes) => prevVotes + 1); // Update votes using functional update
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error(error);
      }
    } finally {
      setIsVoting(false);
    }
  };

  const handleVoteClick = () => {
    if (!hasVoted) {
      Swal.fire({
        title: `Estás seguro de votar por ${name}?`,
        text: errorMessage || "No podrás cambiar tu voto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, votar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleVote();
          if (errorMessage) {
            Swal.fire("Error", "No puedes votar por este candidato", "error");
          } else {
            Swal.fire(
              "Votado",
              "Tu voto ha sido registrado correctamente.",
              "success"
            );
            // refresh the page
            window.location.reload();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelado", "Tu voto no ha sido registrado", "error");
        }
      });
    } else {
      Swal.fire("Votado", "Ya has votado por este candidato", "info");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{name}</h2>
      </div>
      <div className="card-body">
        <img src={photoUrl} alt="Candidato" />
        <p>{proposals}</p>
        <p>
          {votes} {votes === 1 ? "Voto" : "Votos"}
        </p>

        {hasVoted ? (
          <button disabled>Ya has votado</button>
        ) : (
          <button onClick={handleVoteClick} disabled={isVoting}>
            Votar
          </button>
        )}
      </div>
    </div>
  );
}
