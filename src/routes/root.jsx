import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";
import { Link } from "react-router-dom";
import Candidate from "../Candidate";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Root() {
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
      <div className="container">
        <div className="sidebar">
          <h1>UCSG</h1>
          {isAuthenticated && (
            <>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <h3>{user.nickname}</h3>
              <p>{user.email}</p>
              <LogoutButton />
              {/* <Link to="/results">
                <button>Resultados</button>
              </Link> */}
            </>
          )}
        </div>
        <div id="main">
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
                  list={candidate.list}
                  proposals={candidate.proposals}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
