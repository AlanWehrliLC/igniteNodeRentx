import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", ()=> {

  beforeEach(()=> {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    usersTokensRepositoryInMemory= new UsersTokensRepositoryInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it("should to be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "688913",
      email: "emasi@jus.mo",
      name: "Eleanor Long",
      password: "123456"
    })

    await sendForgotPasswordMailUseCase.execute("emasi@jus.mo")

    expect(sendMail).toHaveBeenCalled()
  })

  it("should not be able to send email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("nubvo@fecab.mx")
    ).rejects.toEqual(new AppError("User does not exist!"))
  })

  it("should be able to create a users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")

    usersRepositoryInMemory.create({
      driver_license: "865967",
      email: "muk@sel.be",
      name: "Melvin Lynch",
      password: "123456"
    })

    await sendForgotPasswordMailUseCase.execute("muk@sel.be")

    expect(generateTokenMail).toBeCalled()
  })
})