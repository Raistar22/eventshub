"use server"

import { CreateLocationParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import location from "../database/models/location.model"

export const createLocation = async ({ locationName }: CreateLocationParams) => {
  try {
    await connectToDatabase();

    const newlocation = await location.create({ name: locationName });

    return JSON.parse(JSON.stringify(newlocation));
  } catch (error) {
    handleError(error)
  }
}

export const getAllLocations = async () => {
  try {
    await connectToDatabase();

    const locations = await location.find();

    return JSON.parse(JSON.stringify(locations));
  } catch (error) {
    handleError(error)
  }
}