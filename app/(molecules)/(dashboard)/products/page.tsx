'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import Loading from '@/components/ui/Loading'
import { Button } from '@/components/ui/Button'
import { Separator } from '@/components/ui/Separator'
import { DataTable } from '@/components/ui/DataTable'
import { columns } from '@/components/ui/ProductColumns'

const Products = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductType[]>([])

  const getProducts = async () => {
    try {
      const res = await fetch('/api/products', {
        method: 'GET',
      })
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    } catch (err) {
      console.log('[products_GET]', err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push('/products/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  )
}

export default Products
