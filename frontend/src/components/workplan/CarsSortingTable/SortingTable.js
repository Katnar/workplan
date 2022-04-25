import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios'
import style from 'components/Table.css'
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";

import { signin, authenticate, isAuthenticated } from 'auth/index';

import history from "../../../history";

const SortingTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);

  const [data, setData] = useState([])

  const carfilters = {
    pikodid: props.pikodsid,
    ogdaid: props.ogdasid,
    hativaid: props.hativasid,
    gdodid: props.gdodsid,
    magadalid:props.magadalsid,
    magadid:props.magadsid,
    mkabazid:props.mkabazsid,
    mkatid:props.mkatsid,
    carid:props.carsid,
  }

  const handleRowClick = (row) => {
    history.push(`/carprofile/${row.original._id}`);
  }

  const getCars = async () => {
    try {
      await axios.post(`http://localhost:8000/api/smartcars2`, carfilters)
        .then(response => {
          BuildChartData(response.data);
          //  console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    catch {

    }
  }

  function BuildChartData(data) {
    var tempchartdata = [];
    for (let i = 0; i < data.length; i++) {
      tempchartdata.push(
        {
          _id: data[i]._id,
          mkat: data[i].mkat.name,
          mkabaz: data[i].mkat.mkabaz.name,
          magad: data[i].mkat.mkabaz.magad.name,
          magadal: data[i].mkat.mkabaz.magad.magadal.name,
          gdod: data[i].gdod.name,
          hativa: data[i].gdod.hativa.name,
          ogda: data[i].gdod.hativa.ogda.name,
          pikod: data[i].gdod.hativa.ogda.pikod.name,
        }
      )
    }
    setData(tempchartdata)
  }

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

  useEffect(() => {
    setPageSize(5);
  }, []);

  useEffect(() => {
      getCars();
  }, [props.gdodsid, props.hativasid, props.ogdasid, props.pikodsid,props.carsid,props.mkatsid,props.mkabazsid,props.magadsid,props.magadalsid]);

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-responsive" style={{ overflow: 'auto' }} >
        <table {...getTableProps()} >
          <thead >
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th>
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
                  <tr {...row.getRowProps()} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                    {
                      row.cells.map(cell => {
                        if (cell.column.id == "_id") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "pikod") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "ogda") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "hativa") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "gdod") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "magadal") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "magad") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "mkabaz") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "mkat") {
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