import { Session } from "../../auth/client";
import { Loading } from "../Loading";

export function SignedIn({ user }: Session) {
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      {/* <button hx-get="/api/auth/sign-out" className="btn">
        Sign out
      </button> */}
      <div id="movies-loader" className="htmx-indicator">
        <Loading />
      </div>
    </div>
  );
}
