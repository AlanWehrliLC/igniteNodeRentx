import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car1",
	    description: "Car Description",
      daily_rate: 110.00,
      license_plate: "DIF-3210",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
	    description: "Car Description",
      daily_rate: 110.00,
      license_plate: "DIF-3211",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
	    description: "Car Description",
      daily_rate: 110.00,
      license_plate: "DIF-3212",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
	    description: "Car Description",
      daily_rate: 110.00,
      license_plate: "DIF-3212",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id_test"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id_test",
    })

    expect(cars).toEqual([car])
  })
})