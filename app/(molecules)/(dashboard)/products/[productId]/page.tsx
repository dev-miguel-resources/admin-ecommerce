'use client'

import { useState, useEffect } from 'react'
import Loading from '@/components/ui/Loading'
import ProductForm from '@/components/ui/ProductForm'

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true)
  const [productDetails, setProductDetails] = useState<ProductType | null>(null)

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: 'GET',
      })
      const data = await res.json()
      setProductDetails(data)
      setLoading(false)
    } catch (err) {
      console.log('[productId_GET]', err)
    }
  }

  useEffect(() => {
    getProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? <Loading /> : <ProductForm initialData={productDetails} />
}

export default ProductDetails
