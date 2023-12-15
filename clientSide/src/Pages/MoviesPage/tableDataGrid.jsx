import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const TableDataGrid = ({ allMovies }) => {
 const nav = useNavigate()
  const columns = [

    {
      field: "Image",
      headerName: "Image",
      renderCell: (params) => (
        <img
          src={params.row.Image} // Assuming Image is the URL to the image
          alt={params.row.Name} // You can use a meaningful alt text
          style={{width:60, height: 60 , borderRadius:10}} // Adjust the width and height as needed
         
        />
      ),
      flex:0.2
    },
    { field: "Name", headerName: "Name",flex:0.3 },
    { field: "Premiered", headerName: "Premiered" , flex:0.3 },
    { field: "Genres", headerName: "Genres" ,flex: 1 },
  ];
  const handleRowClick = (params) => {
    nav(`../Movie/${params.row._id}`)
    console.log(params.row._id)
  }
  return (
    <>
    
      <DataGrid  sx={{backgroundColor:"Snow" }} onRowClick={handleRowClick}
      initialState={{
        pagination: { paginationModel: { pageSize: 7 } },
      }}
      
      pageSizeOptions={[7]}
      rowHeight={70}
        rows={allMovies}
        columns={columns}
        getRowId={(row) => row._id}
      />
    </>
  );
};

export default TableDataGrid;
