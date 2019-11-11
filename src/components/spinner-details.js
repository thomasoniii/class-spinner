import React from "react"

import { DataTable, DataTableContent, DataTableHead, DataTableRow, DataTableHeadCell, DataTableBody, DataTableCell } from "@rmwc/data-table"
import { Select } from "@rmwc/select"

import '@material/select/dist/mdc.select.css';
import '@rmwc/data-table/data-table.css'

export default props => {

  const { classroom, spinner } = props

  const spinnerStatus = classroom.spinners[spinner.id] || {}
  const rosterStatus = classroom.roster.map( kid => {
    const row = { kid }
    if (spinnerStatus[kid] !== undefined) {
      row.status = spinnerStatus[kid]
    }
    else {
      row.status = "Available"
    }
    return row
  })

  return (
    <DataTable
      stickyRows={1}
      >
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>Student</DataTableHeadCell>
            <DataTableHeadCell>
              Status
            </DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          { rosterStatus.map( row =>
            <DataTableRow key={row.kid}>
              <DataTableCell>{ row.kid }</DataTableCell>
              <DataTableCell>
                <Select
                  options={ ["Available", "Picked", "Suspended"] }
                  value = { row.status }
                  onChange={ e => props.updateStatus(classroom.id, spinner.id, row.kid, e.target.value) }
                />
              </DataTableCell>
            </DataTableRow>
          )}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  )
}
