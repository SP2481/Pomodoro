"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Sessions = {
  _id: string
  user_id: string
  label: string
  end_time: number
  created_at: string
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`
}

const formatDate = (date:string) => {
  const formattedDate = date.split('T')[0]; 
  return formattedDate;
}


const columns: ColumnDef<Sessions>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "end_time",
    header: "Duration",
    cell: ({row}) => {
      return formatTime(row.original.end_time)
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({row}) => {
       return formatDate(row.original.created_at)
    },
    
  },
]
export default columns