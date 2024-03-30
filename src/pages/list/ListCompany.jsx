import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CompanyDatatable from "../../components/datatable/DatatableCompany";

const ListCompany = () => {
    return (
    <div className="list">
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <CompanyDatatable />
        </div>
    </div>
    );
};

export default ListCompany;
