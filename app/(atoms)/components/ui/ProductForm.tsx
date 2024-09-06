'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from './Loading'
import Delete from './Delete'
import { Separator } from './Separator'
import { Input } from './Input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from './Form'
import { TextArea } from './TextArea'
import ImageUpload from './ImageUpload'

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
})

interface ProductFormProps {
  initialData?: ProductType | null
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState<CollectionType[]>([])

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
      toast.error('Something went wrong!. Please try again.')
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          collections: initialData.collections.map(
            (collection) => collection._id,
          ),
        }
      : {
          title: '',
          description: '',
          media: [],
          category: '',
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  })

  // pendiente
  const handleKeyPress = () => {}

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const url = initialData
        ? `/api/products/${initialData._id}`
        : '/api/products'
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
      })
      if (res.ok) {
        setLoading(false)
        toast.success(`Product ${initialData ? 'updated' : 'created'} `)
        window.location.href = '/products'
        router.push('/products')
      }
    } catch (err) {
      console.log('[products_POST]', err)
      toast.error('Something went wrong!. Please try again.')
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          <Delete id={initialData._id} item="product" />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TextArea placeholder="Description" {...field} rows={5} />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default ProductForm
