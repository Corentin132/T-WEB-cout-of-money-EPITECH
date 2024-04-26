import { GitHub } from "@mui/icons-material";
import { Link } from "react-router-dom";

function OAuthGithub() {
  return (
    <div className="p-3">
      <Link
        className="flex rounded-lg p-3 bg-grey hover:opacity-70"
        to="http://localhost:4000/auth/github"
      >
        <GitHub htmlColor="white"></GitHub>
        <p className="text-white px-2">Connect with Git Hub</p>
      </Link>
    </div>
  );
}

export default OAuthGithub;
