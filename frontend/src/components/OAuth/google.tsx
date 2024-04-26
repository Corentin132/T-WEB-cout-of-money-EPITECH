import { Google } from "@mui/icons-material";
import { Link } from "react-router-dom";
function OAuthGoogle() {
  return (
    <div className="p-3">
      <Link
        className="flex rounded-lg p-3 bg-successLight hover:opacity-70"
        to="http://localhost:4000/auth/google"
      >
        <Google htmlColor="white"></Google>
        <p className="text-white px-2">Connect with google</p>
      </Link>
    </div>
  );
}

export default OAuthGoogle;
