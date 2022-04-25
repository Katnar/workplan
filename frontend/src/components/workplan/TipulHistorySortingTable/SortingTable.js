import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios'
import style from 'components/Table.css'
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import { PROPERTY_TYPES } from "@babel/types";

const SortingTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);

  const [data, setData] = useState([])

  function init() {
    getTipulHistory();
  }

  const getTipulHistory = async () => {
    /*if(props.isactive==true)
    {
      console.log("active")
    }
   else
    {
      console.log("not active")
    }*/
    await axios.get(`http://localhost:8000/api/historytipulbyoriginaltipulid/${props.tipulid}`)
      .then(response => {
        BuildChartData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function BuildChartData(data) {
    var tempchartdata = [];
    for (let i = 0; i < data.length; i++) {
      tempchartdata.push(
        {
          _id: data[i]._id,
          carnumber: data[i].car._id,         
          //tipul details
          lastipuldate: data[i].lastipuldate,
          zkaottipul: data[i].zkaottipul.name,
          tipultype: data[i].tipultype.name,
          tolarancedate: data[i].tolarancedate,
          gofbizoa: data[i].gofbizoa.name,
          description: data[i].description,
          status: data[i].status.name,
          updatedAt: data[i].updatedAt
        }
      )
    }
    setData(tempchartdata)
  }

  useEffect(() => {
    init();
    setPageSize(5);
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,

    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable({
    columns, data, initialState: { pageIndex: 0 },
  },

    useGlobalFilter, useFilters, useSortBy, usePagination);


  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-responsive" style={{ overflow: 'auto' }} >
        <table {...getTableProps()} >
          <thead >
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th  >
                    <div {...column.getHeaderProps(column.getSortByToggleProps())}> {column.render('Header')} </div>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                    <div>
                      {column.isSorted ? (column.isSortedDesc ? '🔽' : '⬆️') : ''}
                    </div>
                  </th>
                ))}
              </tr>
            ))}

          </thead>
          <tbody {...getTableBodyProps()} >
            {
              page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map(cell => {
                        if (cell.column.id == "updatedAt") {
                          return <td>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "carnumber") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "lastipuldate") {
                          return <td>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "tolarancedate") {
                          return <td>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "zkaottipul") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "tipultype") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "gofbizoa") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "description") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "status") {
                          return <td>{cell.value}</td>
                        }
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="pagination" style={{ backgroundColor: 'white' }}>

          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}

          <span>
            עמוד{' '}
            <strong>
              {pageIndex + 1} מתוך {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | חפש עמוד:{' '}
            <input

              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px', borderRadius: '10px' }}
            />
          </span>{' '}
          <select
            style={{ borderRadius: '10px' }}
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 15, 20, 25].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
export default withRouter(SortingTable);;