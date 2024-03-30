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
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { sliderColumns  } from "../../datatablesource";
import AlertTitle from "@mui/material/AlertTitle";
import Carrusel from "../Slider/Slider";


const SliderDatatable = () => {
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "sliders"),
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
      await deleteDoc(doc(db, "sliders", id));
      setData(data.filter((item) => item.id !== id));
      setShowAlert(true);
      setAlertType("success");
      setAlertMessage("Slider eliminado exitosamente");
    } catch (err) {
      console.log(err);
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage("Error al eliminar slider: " + err.message);
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleOpenConfirmDialog(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

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
            ¿Estás seguro de que deseas eliminar este slider?
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
        Add New Slider
        <Link to="/sliders/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={sliderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        
      />
    </div>
  );
};

export default SliderDatatable;
