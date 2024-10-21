import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { AboutPage } from "./components/AboutPage";
import { CurrentTime } from "./components/CurrentTime";
import { HomePage } from "./components/HomePage";
import { Movies } from "./components/Movies";
import { html, serve_static } from "./response";
import { auth } from "./auth";
import { IncomingMessage, ServerResponse } from "https";
import { Readable } from "stream";
import { Miao } from "./components/Miao";
import { SignIn } from "./components/user/sign-in-btn";
import { SignedIn } from "./components/user/signed-in";

// Configuration
const port = process.env?.PORT ? Number(process.env.PORT) : 3000;
const development = process.env?.NODE_ENV === "development";
const hostname = development
  ? "localhost"
  : process.env?.HOSTNAME ?? "localhost";

export function start() {
  const server = Bun.serve({
    port,
    hostname,
    development,
    async fetch(req, ser) {
      if (ser.upgrade(req)) return;

      console.log(`[request]: ${req.method}: ${req.url}`);

      const url = new URL(req.url);

      // Auth route handling

      if (url.pathname === "/api/auth/sign-in") {
        const sesh = await auth.api.signInMagicLink({
          body: {
            email: "test@test.test",
          },
          headers: req.headers,
        });
        return html(<Miao />);
      }
      if (url.pathname === "/api/auth/session") {
        const sesh = await auth.api.getSession({
          headers: req.headers,
        });

        if (sesh?.session) return html(<SignedIn {...sesh} />);

        return html(<SignIn />);
      }

      // verify email
      //http://localhost:3000/api/auth/magic-link/verify?token=VeDJxpmOgYqVwSgLPKQsMElklxUiyDUC&callbackURL=/

      if (url.pathname === "/api/auth/magic-link/verify") {
        const { status } = await auth.api.magicLinkVerify({
          query: {
            token: url.searchParams.get("token") ?? "",
          },
          headers: req.headers,
        });

        if (status) {
          return html(<Miao />);
        }

        // handle error

        return html(<SignIn />);
      }

      // Handle routes
      if (url.pathname === "/") return html(<HomePage />);
      if (url.pathname === "/about") return html(<AboutPage />);
      if (url.pathname === "/time") return html(<CurrentTime />);
      if (url.pathname === "/movies") return html(await Movies());

      // Fallback to serving static files
      return serve_static("public", req);
    },
    websocket: {
      message() {},
      open() {},
      close() {},
      drain() {},
    },
  });

  console.log(`Listening on http://${hostname}:${server.port}...`);
}
