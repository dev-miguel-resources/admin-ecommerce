'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/ui/DataTable'
import Loading from '@/components/ui/Loading'
import { columns } from '@/components/ui/OrderColumns'
import { Separator } from '@/components/ui/Separator'

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`)
      const data = await res.json()
      setOrders(data)
      setLoading(false)
    } catch (err) {
      console.log('[orders_GET]', err)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  )
}

export default Orders
