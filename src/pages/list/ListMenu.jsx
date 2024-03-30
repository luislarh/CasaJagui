import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import MenuDatatable from "../../components/datatable/DatatableMenu";

const ListMenu = () => {
    return (
    <div className="list">
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <MenuDatatable />
        </div>
    </div>
    );
};

export default ListMenu;
