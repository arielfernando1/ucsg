import React, { useState, useEffect } from "react";
import axios from "axios";
import Candidate from "./Candidate";
import { useAuth0 } from "@auth0/auth0-react";
import { GiVote } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Vote() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await axios.get(
          "http://132.145.173.211:5000/api/candidates"
        );
        setCandidates(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCandidates();
  }, []);
  return (
    <>
      <h1>
        <GiVote /> Elige un Consejo
      </h1>
      {/* <div className="candidate-list">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          candidates?.map((candidate) => (
            <Candidate
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              photoUrl={candidate.photoUrl}
              list={candidate.list}
              proposals={candidate.proposals}
            />
          ))
        )}
      </div> */}
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>Consejo 1</h1>
          </div>
          <div className="card-body">
            <img src="src/assets/01.png" alt="c1" />
          </div>
          <Link to="/vote">
            <button>Elegir</button>
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h1>Consejo 1</h1>
          </div>
          <div className="card-body">
            <img src="src/assets/02.png" alt="c2" />
          </div>
          <Link to="/vote">
            <button>Elegir</button>
          </Link>
        </div>
      </div>
    </>
  );
}
