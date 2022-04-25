import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios'
import style from 'components/Table.css'
import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import { isAuthenticated } from "auth/index";
const SortingTable = (props) => {
  const { user } = isAuthenticated();
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
    startdate:props.startdate,
    enddate:props.enddate,
}

  const getTipuls = async () => {
    var tempactivetipuls=[];
    var temptipulsandactive=[];
    try {
      await axios.post(`http://localhost:8000/api/smartactivetipuls3`,tipulfilters)
        .then(response => {
          temptipulsandactive=response.data;
          tempactivetipuls=response.data;
        })
        .catch((error) => {
          console.log(error);
        })
      await axios.post(`http://localhost:8000/api/smarttipuls3`,tipulfilters)
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
          console.log(temptipulsandactive)
          BuildChartData(temptipulsandactive);
        })     
    }
    catch {

    }
  }

  const getTipulswithdates = async () => {
    var tempactivetipuls=[];
    var temptipulsandactive=[];
    try {
      await axios.post(`http://localhost:8000/api/smartactivetipulsbydates3`,tipulfilters)
        .then(response => {
          temptipulsandactive=response.data;
          tempactivetipuls=response.data;
        })
        .catch((error) => {
          console.log(error);
        })
      await axios.post(`http://localhost:8000/api/smarttipulsbydates3`,tipulfilters)
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
          // console.log(temptipulsandactive)
          BuildChartData(temptipulsandactive);
        })     
    }
    catch {

    }
  }

  function BuildChartData(data) {
    var tempchartdata=[];
    for(let i=0; i<data.length;i++)
    
    {
      tempchartdata.push(
        {
          _id:data[i]._id,
          carnumber:data[i].car._id,
          // unit data[i]
          pikod:data[i].car.gdod.hativa.ogda.pikod.name,
          ogda:data[i].car.gdod.hativa.ogda.name,
          hativa:data[i].car.gdod.hativa.name,
          gdod:data[i].car.gdod.name,
          // tipul type data[i]
          magadal:data[i].car.mkat.mkabaz.magad.magadal.name,
          magad:data[i].car.mkat.mkabaz.magad.name,
          mkabaz:data[i].car.mkat.mkabaz.name,
          //tipul details
          lastipuldate:data[i].lastipuldate,
          zkaottipul:data[i].zkaottipul.name,
          tipultype:data[i].tipultype.name,
          tolarancedate:data[i].tolarancedate,
          gofbizoa:data[i].gofbizoa.name,
          description:data[i].description,
          status:data[i].status.name,
          updatedAt:data[i].updatedAt,
          gdodbizoa:data[i].gdodbizoa,
          sadnabizoa:data[i].sadnabizoa,
          carteam:data[i].carteam,
          originaltipulid:data[i].originaltipulid
        }
      )
    }
    setData(tempchartdata)
  }

  const TipulDelete = kshirotId => {//need to fix +think what do we want
    axios.post(`http://localhost:8000/api/tipul/remove/${kshirotId}`)
      .then(response => {
        getTipuls()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    //init();
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

    useEffect(() => {
      if (((props.startdate != undefined) && (props.enddate != undefined)) && ((props.startdate != '') && (props.enddate != ''))) {
          //console.log("refresh card with dates");
          getTipulswithdates();
      }
      else {
          //console.log("refresh card");
          getTipuls();
      }
    }, [props.startdate,props.enddate,props.tipultypesid,props.zkaottipulsid,props.gofbizoasid,props.statussid,props.gdodsid,props.hativasid,props.ogdasid,props.pikodsid,props.carsid,props.mkatsid,props.mkabazsid,props.magadsid,props.magadalsid]);

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
                        if (cell.column.id == "carnumber") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "pikod") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "ogda") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "hativa") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "gdod") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "magadal") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "magad") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "mkabaz") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "lastipuldate") {
                          return <td style={{  textAlign: '-webkit-center'}}>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                        if (cell.column.id == "zkaottipul") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "tipultype") {
                          return <td style={{  textAlign: '-webkit-center'}}>{cell.value}</td>
                        }
                        if (cell.column.id == "tolarancedate") {
                          return <td style={{  textAlign: '-webkit-center'}}>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
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
                        if (cell.column.id == "updatedAt") {
                          return <td style={{  textAlign: '-webkit-center'}}>{(cell.value.slice(0, 10).split("-").reverse().join("-"))}</td>
                        }
                       const cellvalue = cell.value
                        if (cell.column.id == "gdodbizoa" && cell.value) {
                          return <td style={{  textAlign: '-webkit-center'}}>{cellvalue.map(data=>{
                           return <td>{data.name}</td>
                          })}</td> 
                        } if(cell.column.id == "gdodbizoa" && cell.value == undefined){
                          return <td style={{  textAlign: '-webkit-center'}}>לא קיים</td>
                        }

                        if (cell.column.id == "sadnabizoa" && cell.value) {
                          return <td style={{  textAlign: '-webkit-center'}}>{cellvalue.map(data=>{
                           return <td>{data.name}</td>
                          })}</td> 
                        } if(cell.column.id == "sadnabizoa" && cell.value == undefined){
                          return <td style={{  textAlign: '-webkit-center'}}>לא קיים</td>
                        }

                        if (cell.column.id == "carteam" && cell.value) {
                          return <td style={{  textAlign: '-webkit-center'}}>{cellvalue.map(data=>{
                           return <td>{data.name}</td>
                          })}</td> 
                        } if(cell.column.id == "carteam" && cell.value == undefined){
                          return <td style={{  textAlign: '-webkit-center'}}>לא קיים</td>
                        }


                    
                      }) 
                    }
                    
                    {
                      <td role="cell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',minWidth:'120px' }}>
                        {/* {console.log(row.original)} */}
                        {row.original.originaltipulid!=undefined? 
                        <>
                         {user.workplan === "1" ? null :   <Link to={`/editactivetipul/${row.original._id}`}><button className="btn btn-success" style={{ padding: '0.5rem', marginLeft: '1rem' }}><img src={editpic} alt="bookmark" style={{ height: '2rem' }} /></button></Link>}
                      
                        <Link><button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => TipulDelete(row.original._id)}><img src={deletepic} alt="bookmark" style={{ height: '2rem' }} /></button></Link>
                        </>
                       
                        :<>
                        {user.workplan === "1" ? null :  <Link to={`/edittipul/${row.original._id}`}><button className="btn btn-success" style={{ padding: '0.5rem', marginLeft: '1rem' }}><img src={editpic} alt="bookmark" style={{ height: '2rem' }} /></button></Link>}
                        
                        {/* <Link><button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => TipulDelete(row.original._id)}><img src={deletepic} alt="bookmark" style={{ height: '2rem' }} /></button></Link> */}
                        </>
                        }  
                      </td>
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