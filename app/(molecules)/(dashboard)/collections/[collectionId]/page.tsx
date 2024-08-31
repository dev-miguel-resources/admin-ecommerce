'use client'

import { useEffect, useState } from 'react'

import Loading from '@/components/ui/Loading'
import CollectionForm from '@/components/CollectionForm'

type CollectionType = {
  _id: string // Assuming collections might have an optional identifier.
  title: string // Title of the collection
  description: string // Description of the collection
  image: string // URL of the image associated with the collection
}

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string }
}) => {
  const [loading, setLoading] = useState(true)
  const [
    collectionDetails,
    setCollectionDetails,
  ] = useState<CollectionType | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: 'GET',
      })
      const data = await res.json()
      setCollectionDetails(data)
      setLoading(false)
    } catch (err) {
      console.log('[collectionId_GET]', err)
    }
  }

  useEffect(() => {
    getCollectionDetails()
  }, [getCollectionDetails])

  return loading ? (
    <Loading />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  )
}

export default CollectionDetails
