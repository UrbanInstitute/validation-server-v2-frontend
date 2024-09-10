import { authService } from "@/services";
import { createAuthMachine } from "./createAuthMachine";

const authMachine = createAuthMachine({ authService });
export { authMachine };
