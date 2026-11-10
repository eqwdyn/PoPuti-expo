import { AxiosInstance } from "axios";
import { User } from "@entities/User.ent";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

const loginPath = "account/login" as const;
const registerPath = "account/register" as const;
const mePath = "account/me" as const;
const refreshPath = "account/refresh" as const;

export class AuthApi {
  constructor(private readonly api: AxiosInstance) {}

  async login(dto: LoginDto): Promise<string> {
    const { data } = await this.api.post<{ accessToken: string }>(
      loginPath,
      dto,
    );
    return data.accessToken;
  }

  async register(dto: RegisterDto): Promise<string> {
    const { data } = await this.api.post<{ accessToken: string }>(
      registerPath,
      dto,
    );
    return data.accessToken;
  }

  async refresh(): Promise<string> {
    const { data } = await this.api.post<{ accessToken: string }>(refreshPath);
    return data.accessToken;
  }

  async me(): Promise<User> {
    try {
      const { data: user } = await this.api.get<User>(mePath);
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
