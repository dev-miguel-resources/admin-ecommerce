'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from './ui/Separator'
import { Button } from './ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form'
import Input from './ui/Input'
// falta componente de text area
// componente que se encarga de las imagenes
import Delete from './ui/Delete'
import { TextArea } from './ui/TextArea'
import ImageUpload from './ui/ImageUpload'

// esquema de validations
const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
})

// definir el tipo de Collection
type CollectionType = {
  _id: string
  title: string
  description: string
  image: string
}

// contrato de props del collection Form
interface CollectionFormProps {
  initialData?: CollectionType | null
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  // definición del objeto form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: '',
          description: '',
          image: '',
        },
  })

  // manejo de un evento
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  // manejo de la función de envío del form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : '/api/collections'
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
      })
      if (res.ok) {
        setLoading(false)
        toast.success(`Collection ${initialData ? 'updated' : 'created'}`)
        window.location.href = '/collections'
        router.push('/collections')
      }
    } catch (err) {
      console.log('[collections_POST]', err)
      toast.error('Something went wrong! Please try again.')
    }
  }

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Collection</p>
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
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
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
                  <TextArea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default CollectionForm

// Pendiente Delete
