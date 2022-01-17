import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import "dotenv/config"


const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider)
}

container.registerInstance<IMailProvider>(
  "MailProvider", 
  mailProvider[process.env.MAIL_PROVIDER]
)