import { Loading } from "../Loading";

export function SignIn() {
  return (
    <>
      <button hx-get="/api/auth/sign-in" className="btn" hx-swap="outerHTML">
        Sign in
      </button>

      <div id="movies-loader" className="htmx-indicator">
        <Loading />
      </div>
    </>
  );
}
