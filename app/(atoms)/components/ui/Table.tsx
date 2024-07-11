import React from 'react'

import { cn } from '@/lib/utils'

const Table = React.forwardRef<
  // para la conformación de la tabla con su etiqueta table
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
))

Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  // encabezado de la tabla
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))

TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  // el cuerpo de la tabla
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))

TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  // el pie de la tabla con manejo de fondos y bordes
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr:]:border-b-0',
      className,
    )}
    {...props}
  />
))

TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  // para el manejo de filas de la tabla
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state-selected]:bg-muted',
      className,
    )}
    {...props}
  />
))

TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  // para el encabezado de celdas con estilos de alineación, espacio y fuente
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
      className,
    )}
    {...props}
  />
))

TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  // para una definición específica de celda con alineación y espaciado
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-4 align-middle',
      className,
    )}
    {...props}
  />
))

TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell }
