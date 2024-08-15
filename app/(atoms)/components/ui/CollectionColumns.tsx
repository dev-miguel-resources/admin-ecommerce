'use client'

import { ColumnDef } from '@tanstack/react-table'
import Delete from './Delete'
import Link from 'next/link'

// crearemos una interfaz que define la estructura del objeto de colección que la tabla manejará
// Inclusión de props: _id, title, description, image y products.
type CollectionType = {
  _id: string
  title: string
  description: string
  image: string
  products: []
}

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: 'products',
    header: 'Products',
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
]
