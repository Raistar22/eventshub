import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ILocation } from "@/lib/database/models/location.model"
import { startTransition, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createLocation, getAllLocations } from "@/lib/actions/location.actions"

type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [locations, setLocations] = useState<ILocation[]>([])
  const [newLocation, setNewLocations] = useState('');

  const handleAddLocation = () => {
    createLocation({
      locationName: newLocation.trim()
    })
      .then((location) => {
        setLocations((prevState) => [...prevState, location])
      })
  }

  useEffect(() => {
    const getLocations = async () => {
      const categoryList = await getAllLocations();

      categoryList && setLocations(categoryList as ILocation[])
    }

    getLocations();
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
        {locations.length > 0 && locations.map((location) => (
          <SelectItem key={location._id} value={location._id} className="select-item p-regular-14">
            {location.name}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new Location</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Location</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Location name" className="input-field mt-3" onChange={(e) => setNewLocations(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddLocation)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default Dropdown