import { Get, Route } from "tsoa";

interface Response {
  token: string;
  message: string;
}
@Route("auth")
export default class OauthController {
  @Get("/google")
  public getGoogle(): Response {
    return {
      token: "",
      message: "",
    };
  }
  @Get("/github")
  public getGithub(): Response {
    return {
      token: "",
      message: "",
    };
  }
}
