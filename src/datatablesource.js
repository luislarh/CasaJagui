export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const companyColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nombre", width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    }, },
  { field: "description", headerName: "Descripción", width: 300 },
  { field: "categoria", headerName: "Categoria", width: 300 },
  { field: "email", headerName: "Correo", width: 200 },
  { field: "contactName", headerName: "Nombre del Encargado", width: 200 },
  { field: "phoneNumber", headerName: "Número de celular", width: 200 },
  // {
  //   field: "logo",
  //   headerName: "Logotipo",
  //   width: 200,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.img} alt="avatar" />
  //       </div>
  //     );
  //   },
  // },
];

// Para el slider
export const sliderColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nombre", width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    }, },

];
export const menuColumns = [
  { field: "name", headerName: "Nombre", width: 200,},
  {field: "description", headerName: "Descripción", width: 300 },
  { field: "precio", headerName: "Precio", width: 200 },
  { field: "category", headerName: "Categoria", width: 200 },
  ]
