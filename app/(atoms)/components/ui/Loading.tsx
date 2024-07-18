import React from 'react'

// medidor de carga de Next.14 con su nombre reservado Loading...
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
    </div>
  )
}

export default Loading
