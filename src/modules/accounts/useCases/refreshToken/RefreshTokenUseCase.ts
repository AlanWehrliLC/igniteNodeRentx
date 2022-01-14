import { sign, verify } from "jsonwebtoken"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { inject, injectable } from "tsyringe"
import auth from "@config/auth"
import { AppError } from "@shared/errors/AppError"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"

interface IPayload {
  sub: string, 
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute(token: string){
    const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!")
    }

    await this.usersTokenRepository.deleteById(userToken.id)

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    await this.usersTokenRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}

export {RefreshTokenUseCase}