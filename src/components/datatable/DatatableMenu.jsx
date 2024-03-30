import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Agregamos useNavigate
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { menuInputs } from "../../formSource";
import { menuColumns } from "../../datatablesource";

const MenuDatatable = () => {
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate(); // Inicializamos useNavigate aquí

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "menu"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "menu", id));
      // Vuelve a obtener los datos de la base de datos después de eliminar un elemento
      const newData = [];
      const snapShot = await onSnapshot(collection(db, "menu"));
      snapShot.docs.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
      setShowAlert(true);
      setAlertType("success");
      setAlertMessage("Platillo eliminado exitosamente");
    } catch (err) {
      console.log(err);
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage("Error al eliminar platillo: " + err.message);
    }
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteId);
    setDeleteId(null);
    setShowConfirmDialog(false);
  };

  const handleOpenConfirmDialog = (id) => {
    setDeleteId(id);
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleEdit = (id) => {
    const selectedData = data.find(item => item.id === id);
    navigate("/menu/edit/${id}", { state: { initialData: selectedData } });
  };

  const handleView = (id) => {
    navigate(`/menu/${id}`); // Redirige a la ruta de visualización con el ID del elemento
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              Editar
            </div>
            <div
              className="viewButton"
              onClick={() => handleView(params.row.id)}
            >
              Ver
            </div> */}
            <div
              className="deleteButton"
              onClick={() => handleOpenConfirmDialog(params.row.id)}
            >
              Eliminar
            </div>
          </div>
        );
      },
    },
  ];

  // Filtrar solo los campos que no son la categoría
  const columns = menuInputs.filter(input => input.id !== "categorias").concat(actionColumn);

  return (
    <div className="datatable">
      {showAlert && (
        <Alert severity={alertType} onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este platillo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <div className="datatableTitle">
        Add New Platillo
        <Link to="/menu/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={menuColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default MenuDatatable;
