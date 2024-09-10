import Config from "./config";
import Validators from "./validators";
import AuthService from "./authService";
import { validateEmail } from "@/lib/utils";

const config = new Config();

const authService = new AuthService({
  config: config,
  validators: new Validators(validateEmail),
});

export { authService, config };
