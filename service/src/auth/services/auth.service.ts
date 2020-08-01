import { Injectable, Inject } from "@nestjs/common";
import { RedisService } from "nestjs-redis";
import { Redis } from "ioredis";
import jwt from "jsonwebtoken";

import { TokenPair } from "src/global/interfaces/TokenPair";
import { ConfigService } from "@nestjs/config";

interface TokenPayload {
  username: string;
}

@Injectable()
export class AuthService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  private readonly redisClient: Redis;

  constructor(
    @Inject(RedisService)
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  public async generateTokenPair(username: string): Promise<TokenPair> {
    const accessToken = jwt.sign({ username }, this.tokenSecret, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ username }, this.tokenSecret, {
      expiresIn: "1h",
    });

    await this.redisClient.set(username, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async validateRefreshToken(
    refreshToken: string,
  ): Promise<string | false> {
    try {
      const { username } = jwt.verify(
        refreshToken,
        this.tokenSecret,
      ) as TokenPayload;

      const token = await this.redisClient.get(username);

      if (!token || refreshToken != token) throw new Error();

      return username;
    } catch (error) {
      return false;
    }
  }

  public async logout(refreshToken: string): Promise<void> {
    try {
      const { username } = jwt.verify(
        refreshToken,
        this.tokenSecret,
      ) as TokenPayload;

      this.redisClient.set(username, "");
    } catch (error) {}
  }

  get tokenSecret() {
    return this.configService.get<string>("secrets.token");
  }
}
