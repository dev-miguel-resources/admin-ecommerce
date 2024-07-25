'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
// falta otra librería
import { Separator } from './ui/Separator'
import { Button } from './ui/Button'
// falta definiciones de form
import { Form, FormField, FormItem } from './ui/Form'
import Input from './ui/Input'
// falta componente de text area
// componente que se encarga de las imagenes
import Delete from './ui/Delete'

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
  return <div>Hello am CollectionForm!</div>
}

export default CollectionForm
