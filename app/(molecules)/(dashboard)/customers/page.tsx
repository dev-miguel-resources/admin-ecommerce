import { DataTable } from '@/components/ui/DataTable'
import { columns } from '@/components/ui/CustomerColumns'
import { Separator } from '@/components/ui/Separator'
import Customer from '@/lib/models/Customer'
import { connectToDB } from '@/lib/mongoDB'

const Customers = async () => {
  await connectToDB()

  const customers = await Customer.find().sort({ createdAt: 'desc' })

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default Customers
