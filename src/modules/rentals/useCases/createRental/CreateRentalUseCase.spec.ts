import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsProvider: DayjsDateProvider

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory, 
      dayjsProvider,
      carsRepositoryInMemory
      )
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "121212",
      expected_return_date: dayAdd24hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another open to the same user", () => {
    expect(async ()=>{
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "121212",
        expected_return_date: dayAdd24hours
      })
      
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "121212",
        expected_return_date: dayAdd24hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental if there is another open to the same car", () => {
    expect(async ()=>{
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "test",
        expected_return_date: dayAdd24hours
      })
      
      await createRentalUseCase.execute({
        user_id: "4321",
        car_id: "test",
        expected_return_date: dayAdd24hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental with invalid return time", () => {
    expect(async ()=>{
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})