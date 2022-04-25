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

  const handleRowClick = (row) => {
    //history.push(`/carprofile/${row.original._id}`);
  }

  function init() {
    getCarTipuls();
  }

  const getCarTipuls = async () => {
    if (props.carid != undefined) {
      // await axios.get(`http://localhost:8000/api/smarttipuls/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${props.carid}/${undefined}/${undefined}/${undefined}/${undefined}`)
      // .then(response => {
      //   BuildChartData(response.data)
      // })
      // .catch((error) => {
      //     console.log(error);
      // })
      var tempactivetipuls = [];
      var temptipulsandactive = [];
      await axios.get(`http://localhost:8000/api/smartactivetipuls/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${props.carid}/${undefined}/${undefined}/${undefined}/${undefined}`)
        .then(response => {
          temptipulsandactive = response.data;
          tempactivetipuls = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
      await axios.get(`http://localhost:8000/api/smarttipuls/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${undefined}/${props.carid}/${undefined}/${undefined}/${undefined}/${undefined}`)
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            var bool = true;
            for (var j = 0; j < tempactivetipuls.length; j++) {
              if (response.data[i]._id == tempactivetipuls[j].originaltipulid) {
                bool = false;
              }
            }
            if (bool == true) {
              temptipulsandactive.push(response.data[i]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(response => {
          BuildChartData(temptipulsandactive)
        })
    }
  }

  function BuildChartData(data) {

    var tempchartdata = [];
    for (let i = 0; i < data.length; i++) {
      tempchartdata.push(
        {
          _id: data[i]._id,
          carnumber: data[i].car._id,
          // unit data[i]
          pikod: data[i].car.gdod.hativa.ogda.pikod.name,
          ogda: data[i].car.gdod.hativa.ogda.name,
          hativa: data[i].car.gdod.hativa.name,
          gdod: data[i].car.gdod.name,
          // tipul type data[i]
          magadal: data[i].car.mkat.mkabaz.magad.magadal.name,
          magad: data[i].car.mkat.mkabaz.magad.name,
          mkabaz: data[i].car.mkat.mkabaz.name,
          //tipul details
          lastipuldate: data[i].lastipuldate,
          zkaottipul: data[i].zkaottipul.name,
          tipultype: data[i].tipultype.name,
          tolarancedate: data[i].tolarancedate,
          gofbizoa: data[i].gofbizoa.name,
          description: data[i].description,
          status: data[i].status.name,
          originaltipulid: data[i].originaltipulid
        }
      )
    }
    setData(tempchartdata)
  }

  useEffect(() => {
    setPageSize(5);
  }, []);

  useEffect(() => {
    init();
  }, [props]);

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
                <th></th>
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
                        if (cell.column.id == "_id") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "lastipuldate") {
                          return <td>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "zkaottipul") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "tipultype") {
                          return <td>{cell.value}</td>
                        }
                        if (cell.column.id == "tolarancedate") {
                          return <td>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
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
                    <td role="cell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {row.original.originaltipulid != undefined ?
                        <>
                          <Link to={`/activetipulprofile/${row.original._id}`}><button className="btn btn-success">לצפייה בפרטי טיפול</button></Link>
                        </>
                        : <>
                          <Link to={`/tipulprofile/${row.original._id}`}><button className="btn btn-success">לצפייה בפרטי טיפול</button></Link>
                        </>
                      }
                    </td>

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