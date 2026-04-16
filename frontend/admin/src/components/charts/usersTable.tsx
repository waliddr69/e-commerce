import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FormEvent, useEffect, useState } from 'react';
import "./style.css"

type params = {
    name:string,avatar:string,numOrders:number,products:string[],clientId:string,discount?:number
}

type rowArr = {
    rows:params[]
}



export default function UsersTable({rows}:rowArr) {
  const [data,setData] = useState<params[]>(rows)
  const [dialogue,setDialogue] = useState(false)
  const [dialogueEdit,setDialogueEdit] = useState(false)
  const [success,setSuccess] = useState<boolean|null>(null)
  const [changeDis,setChangeDis] = useState<number|null>(null)
  const [value,setValue] = useState<number|null>(null)
  const [id,setId] = useState<string|null>(null)
  const [index,setIndex] = useState<number>(-1)
  useEffect(() => {
    setData(rows);
  }, [rows]);
  const handleSubmit = async(e:FormEvent)=>{
    e.preventDefault()
    const req = await fetch(process.env.REACT_APP_API_USER_URL+"/addDiscount",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({clientId:id,value})

    })
    const res = await req.json()
    console.log(res)
    if(!res.success){
      setSuccess(false)
    }else{
      setDialogueEdit(false)
      setDialogue(false)
      const copy = [...data]
      copy[index].discount = value!
      setData(copy)
    }
  }
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:"#494949"}}>
          <TableRow style={{color:"white"}}>
            <TableCell style={{fontWeight:"bold",color:"white",fontSize:18}}>Client</TableCell>
            <TableCell align="right" style={{fontWeight:"bold",fontSize:18,color:"white"}}>Number of orders</TableCell>
            <TableCell align="center" style={{fontWeight:"bold",fontSize:18,color:"white"}}>Products&nbsp;</TableCell>
            <TableCell align="center" style={{fontWeight:"bold",fontSize:18,color:"white"}}>Action&nbsp;</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row:params,i:number) => (
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
              <TableCell align="center" >
                {row.discount !=undefined ? (
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  <span> {row.discount + "%"}</span>
                  <span onClick={()=>{
                  setDialogueEdit(true)
                  setId(row.clientId)
                  setIndex(i)
                  setChangeDis(row.discount!)
                  }} style={{ color: "#789DE5",cursor:"pointer" }} className="material-symbols-rounded">edit</span>
                </div>
                
                ) : (
                <div onClick={()=>{
                  setDialogue(true)
                  setId(row.clientId)
                  setIndex(i)
                  }} style={{color:"#789DE5",display:"flex",alignItems:"center",justifyContent:"center",gap:6,cursor:"pointer"}}>
                  <span className="material-symbols-rounded">percent_discount</span> 
                  add discount
                </div>
                )}
                
               
                
                
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {dialogue && (
    <div className="dialogue" style={{width:"40%",padding:8,position:"fixed",zIndex:10,transform:"translate(-50%,-50%)",left:"50%",top:"50%"}}>
      <h3>Discount</h3>
      <form onSubmit={(e)=>handleSubmit(e)}>
        {success==false && (<p style={{color:"red"}}>there was an error</p>)}
        <input type="number" step={1} onChange={(e)=>setValue(Number(e.target.value))} min={1} max={100}  placeholder="Discount value" className="form-control" required/> 
        <button type="submit">ADD</button>
      </form>

    </div>
    )}
    {dialogueEdit && (
    <div className="dialogue" style={{width:"40%",padding:8,position:"fixed",zIndex:10,transform:"translate(-50%,-50%)",left:"50%",top:"50%"}}>
      <h3>Change Discount</h3>
      <form onSubmit={(e)=>handleSubmit(e)}>
        {success==false && (<p style={{color:"red"}}>there was an error</p>)}
        <input type="number" step={1} defaultValue={changeDis!} onChange={(e)=>Number(e.target.value) >0 ? setValue(Number(e.target.value)):setValue(null)} min={0} max={100}  placeholder="Discount value" className="form-control" required/> 
        <button type="submit">ADD</button>
      </form>

    </div>
    )}

    {(dialogue || dialogueEdit) && (
      <div className="overflow" onClick={()=>{
        setDialogue(false)
        setDialogueEdit(false)
        }} style={{backgroundColor:"#00000048"}}>

      </div>
    )}
    </>
    
  );
}
