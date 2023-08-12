import { useState, useEffect } from "react";
import axios from "axios";
import Candidate from "./Candidate";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

export default function CandidatesList() {
  const { isLoading } = useAuth0();
  const { param } = useParams();
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/candidates/${param}`
        );
        setCandidates(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    3;
    fetchCandidates();
  }, []);

  return (
    <div className="candidate-list">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        candidates?.map((candidate) => (
          <Candidate
            key={candidate.id}
            id={candidate.id}
            name={candidate.name}
            photoUrl={candidate.photoUrl}
            proposals={candidate.proposals}
            party_id={candidate.party_id}
          />
        ))
      )}
    </div>
  );
}
