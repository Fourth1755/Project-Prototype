import React, { useEffect, useState, useRef } from 'react'
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Table,
  TableRow,
  Stack,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  Modal,
  MenuItem
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { Grid, TextField, Paper } from '@material-ui/core'
import { Add } from '@mui/icons-material'
import axios from '@/utils/axios.utils'
import APIService from '@/services/api.service'
import Chip from '@mui/material/Chip'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { useHistory } from 'react-router-dom'

import './index.scss'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'

const userService = new APIService('/line/lineaccout/list')
const lineServiceDelete = new APIService('line/lineaccout/delete')

const CreateLineModal = React.lazy(() => import('@/components/organisms/CreateLineModal'))
function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

const ReportPage = (props) => {
  const role = useSelector((state) => state.auth?.profile.role)
  const partnerList = useSelector((state) => state.app.partnerList ?? [])

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [dataPerPage, setdataPerPage] = useState(0)
  const [empthyRow, setempthyRow] = useState(0)
  const [page, setPage] = useState(0)
  const [Search, setSearch] = useState('')
  const [Partner, setPartner] = useState('')
  const [status, setStatus] = useState('')
  const myPartner = useSelector((state) => state.auth.activePartner ?? {})
  const userList = useSelector((state) => state.app?.usersList)
  const tableRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (role === 'supervisor') {
      dispatch.app.fetchUsersList({ partner: myPartner.id })
    } else {
      dispatch.app.fetchUsersList()
    }
    dispatch.app.searchPartners()

    if (role === 'user') {
      history.push('chats')
    }
  }, [])

  useEffect(() => {
    
    setempthyRow(0)
    setdataPerPage(userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length)
    if (page > 0) {
      if (userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0) {
        setPage(page - 1)
      }
    }
    if (page > 0) {
      const count = userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
      if (count !== rowsPerPage) {
        if (rowsPerPage > count) {
          setempthyRow(63.75 * (rowsPerPage - count - 3.6))
        }
      } else {
        setempthyRow(0)
      }
    }
  }, [page, userList])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const statusOptions = [
    { status: 'true', title: 'Active' },
    { status: 'false', title: 'Inactive' }
  ]
  const handleSubmit = async () => {
    if (role === 'supervisor') {
      dispatch.app.fetchUsersList({ search: Search, is_active: status, partner: myPartner.id })
    } else {
      dispatch.app.fetchUsersList({ search: Search, is_active: status, partner: Partner })
    }
  }
  const handleClearSearch = async () => {
    setSearch('')
    setStatus('')
    if (role === 'supervisor') {
      dispatch.app.fetchUsersList({ partner: myPartner.id })
    } else {
      dispatch.app.fetchUsersList()
    }
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '90vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    py: 2,
    px: 4
  }
  useEffect(() => {
    if (tableRef !== null) {
      tableRef.current.scrollTo(0, 0)
    }
  }, [page])
  return (
    <Container className="page-container-report">
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Report</Typography>
      </Stack>
      <Paper className="paper-header-report">
        <Grid container className="searchBar-report">
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <TextField
              label="Search"
              fullWidth
              margin={'normal'}
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined" />
          </Grid>
          {role === 'supervisor'
            ? <></>
            : <Grid item xs={12} sm={12} md={4} lg={3} >
              <FormControl fullWidth size='small' className="filterForm-report">
                <InputLabel id="demo-simple-select-helper-label">Partner</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={Partner}
                  label="Status"
                  onChange={(e) => setPartner(e.target.value)}
                >
                  {partnerList.map((r) => (
                    <MenuItem key={`pfo-${r.id}`} value={r.id}>
                      {r.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>}
          <Grid item xs={12} sm={12} md={4} lg={3} >
            <FormControl fullWidth size='small' className="filterForm-report">
              <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusOptions.map((r) => (
                  <MenuItem key={`pfo-${r.id}`} value={r.status}>
                    {r.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={2} md={1} lg={1}>
            <Button className="buttonSearchDefault" variant="contained"
              onClick={() => handleSubmit()}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={2} sm={2} md={1} lg={1}>
            <Button className="buttonClearDefault" variant="contained"
              onClick={() => handleClearSearch('', '')} >
              Clear
            </Button>
          </Grid>
          <Grid item sm={'auto'} md={'auto'} lg={3}>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper} className='fix-height-monitor-report' ref={tableRef}>
        <Table stickyHeader >
          <TableHead>
            <TableRow >
              <TableCell align='center' className="custom-table-report">#</TableCell>
              <TableCell align='center' className="custom-table-report">Partner</TableCell>
              <TableCell align='center' className="custom-table-report">Operator</TableCell>
              <TableCell align='center' className="custom-table-report">Customer</TableCell>
              <TableCell align='center' className="custom-table-report">Date Start</TableCell>
              <TableCell align='center' className="custom-table-report">Date End</TableCell>
              <TableCell align='center' className="custom-table-report">Job Type</TableCell>
              <TableCell align='center' className="custom-table-report">Status</TableCell>
            </TableRow>
          </TableHead>
          {userList.length === 0
            ? <TableCell colSpan={6} align='center'>
              <Typography>No Results</Typography>
            </TableCell>
            : <TableBody>
              {(rowsPerPage > 0
                ? userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : userList
              ).map((user, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row" align='center'>
                    {page !== 0 ? page * rowsPerPage + i + 1 : i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {user.partner_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {user.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {user.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {user.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {user.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {user.first_name}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {user.first_name}
                  </TableCell>
                </TableRow>
              ))}
              {userList.length > 9 &&
                empthyRow !== 0 &&
                <div style={{ height: empthyRow }}>
                </div>
              }
            </TableBody>}
          {userList.length > 9 &&
            <TableFooter className='stick-footer-report'>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={userList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          }
        </Table>
      </TableContainer>
    </Container >
  )
}

export default ReportPage
