import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from './GlobalFilter'
import editpic from "assets/img/edit.png";
import axios from 'axios'
import SettingModal from "../modal/SettingModal";
import { Input, Button } from "reactstrap";

const SortingTable = ({ match }) => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState('');
  const [editgdodbizoa, setEditGdodBizoa] = useState(false);
const [editData, setEditData] = useState('')
  const showGdodEditModal = () => {
    setEditGdodBizoa(true);
  };
  const handleGdodEditCancel = () => {
    setEditGdodBizoa(false);
  };
  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:8000/api/gdod");
      setData(result.data);
      console.log(data)
    })();
  }, []);

  const editGdod = gdodId => {
    axios.put(`http://localhost:8000/api/gdod/${gdodId}`, {name:modalData})
      .then(response => {
        loadUsers()
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const gdodDelete = gdodId => {
    axios.delete(`http://localhost:8000/api/gdod/${gdodId}`)
      .then(response => {
        loadUsers()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const loadUsers = () => {
    axios.get("http://localhost:8000/api/gdod")
      .then(response => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
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


  return (
    <>

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="table-responsive" style={{ overflow: 'auto' }}>
        <table {...getTableProps()}>
          <thead>
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
                <th>עדכן</th>
                <th>מחק</th>
              </tr>
            ))}

          </thead>
          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
                    {console.log(row.original._id)}
                    <td role="cell"> <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <button
                    className="btn btn-success"
                    style={{ padding: "0.5rem" }}
                    onClick={() => {
                    setModalData(row.original)
                  console.log('press',row.original._id)
                      showGdodEditModal();
                    }}
                  >
                    <img
                      src={editpic}
                      alt="bookmark"
                      style={{ height: "2rem" }}
                    />
                  </button>
                 { console.log(row)}
                  </div>  <SettingModal 
                  // add all the relavent field 
                            title="ערוך גדוד לביצוע"
                            visible={editgdodbizoa}
                            onCancel={handleGdodEditCancel}>
                                <Input
                                    type="text"
                                    placeholder={modalData.name}
                                    value={modalData.name}
                                    onChange={(e) => {
                                        setEditData(e.target.value);
                                    }}
                                ></Input>
                                
                                <Button onClick={() => editGdod(row.original._id)}>עדכן</Button>
            </SettingModal> </td>
                    <td role="cell"> <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <button className="btn btn-danger" onClick={() => gdodDelete(row.original._id)}>מחק</button></div></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="pagination">

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
            {[10, 20, 30, 40, 50].map(pageSize => (
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