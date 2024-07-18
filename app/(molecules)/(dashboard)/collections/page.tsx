'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

import { columns } from '../../../(atoms)/components/ui/CollectionColumns'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import Loading from '@/components/ui/Loading'
import { DataTable } from '@/components/ui/DataTable'

const Collections = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  const getCollections = async () => {
    try {
      const res = await fetch('/api/collections', {
        method: 'GET',
      })
      const data = await res.json()
      setCollections(data)
      setLoading(false)
    } catch (err) {
      console.log('[collections_GET]', err)
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button
          className="bg-blue-1 text-white "
          onClick={() => router.push('/collections/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  )
}

export default Collections
