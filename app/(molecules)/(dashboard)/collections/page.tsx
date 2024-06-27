'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import Loader from '@/components/ui/Loader'
import DataTable from '@/components/ui/DataTable'
import CollectionColumns from '@/components/ui/CollectionColumns'

const Collections = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  const getCollections = async () => {
    // por definir
  }

  useEffect(() => {
    // por definir
  }, [])

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className='bg-grey-1 my-4' />
      <DataTable />
    </div>
  )
}

export default Collections
