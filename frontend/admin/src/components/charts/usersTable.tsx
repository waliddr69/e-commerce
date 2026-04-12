import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

type params = {
    name:string,avatar:string,numOrders:number,products:string[]
}

type rowArr = {
    rows:params[]
}



export default function UsersTable({rows}:rowArr) {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"#494949"}}>
          <TableRow style={{color:"white"}}>
            <TableCell style={{fontWeight:"bold",color:"white",fontSize:18}}>Client</TableCell>
            <TableCell align="right" style={{fontWeight:"bold",fontSize:18,color:"white"}}>Number of orders</TableCell>
            <TableCell align="center" style={{fontWeight:"bold",fontSize:18,color:"white"}}>Products&nbsp;</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row">
                <div style={{display:"flex",alignItems:"center",justifyItems:"center",gap:"8px"}}>
                  <img src={row.avatar} alt="avatar" width={50} style={{borderRadius:"50%"}} />
                <p style={{margin:0}}>{row.name}</p>
                </div>
                
              </TableCell>
              <TableCell align="right">{row.numOrders}</TableCell>
              <TableCell align="center">{row.products.map(e=>(
                <p>{e}</p>
              ))}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
