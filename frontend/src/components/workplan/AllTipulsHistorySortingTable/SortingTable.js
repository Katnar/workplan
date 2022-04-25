import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios'

const SortingTable = (props) => {
  const columns = useMemo(() => COLUMNS, []);

  const [data, setData] = useState([])

  const tipulfilters={
    pikodid:props.pikodsid,
    ogdaid:props.ogdasid,
    hativaid:props.hativasid,
    gdodid:props.gdodsid,
    //
    magadalid:props.magadalsid,
    magadid:props.magadsid,
    mkabazid:props.mkabazsid,
    mkatid:props.mkatsid,
    carid:props.carsid,
    //
    gofbizoaid:props.gofbizoasid,
    statusid:props.statussid,
    tipultypeid:props.tipultypesid,
    zkaottipulid:props.zkaottipulsid,
    //
    updatedAtstartdate:props.updatedAtstartdate,
    updatedAtenddate:props.updatedAtenddate,
}

  const getAllTipulsHistory = async () => {
    await axios.post(`http://localhost:8000/api/smarthistorytipuls2`,tipulfilters)
        .then(response => {
          BuildChartData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

  const getAllTipulsHistorywithdates = async () => {
    await axios.post(`http://localhost:8000/api/smarthistorytipulsbydates2`,tipulfilters)
        .then(response => {
          BuildChartData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

  async function BuildChartData(data) {
    var tempchartdata = [];
    for (let i = 0; i < data.length; i++) {
      tempchartdata.push(
        {
          originaltipulid: data[i].originaltipulid,
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
      if (((props.updatedAtstartdate != undefined) && (props.updatedAtenddate != undefined)) && ((props.updatedAtstartdate != '') && (props.updatedAtenddate != ''))) {
          //console.log("refresh card with dates");
          getAllTipulsHistorywithdates();
      }
      else {
          //console.log("refresh card");
          getAllTipulsHistory();
      }
    }, [props.updatedAtstartdate, props.updatedAtenddate, props.tipultypesid, props.zkaottipulsid, props.gofbizoasid, props.statussid,props.gdodsid,props.hativasid,props.ogdasid,props.pikodsid,props.carsid,props.mkatsid,props.mkabazsid,props.magadsid,props.magadalsid]);

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
                        if (cell.column.id == "originaltipulid") {
                          return <td style={{fontSize:"12px", textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "updatedAt") {
                          return <td style={{  textAlign: '-webkit-center'}}>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "carnumber") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "lastipuldate") {
                          return <td style={{  textAlign: '-webkit-center'}}>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "tolarancedate") {
                          return <td style={{  textAlign: '-webkit-center'}}>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "zkaottipul") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "tipultype") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "gofbizoa") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "description") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "status") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
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