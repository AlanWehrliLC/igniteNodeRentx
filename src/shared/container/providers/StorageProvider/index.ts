import { container } from "tsyringe"
import { LocalStorageProvider } from "./implementations/LocalStorageProvider"
import { IStorageProvider } from "./IStorageProvider"
import "dotenv/config"


const diskStorage = {
  local: LocalStorageProvider
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.DISK]
)