import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SliderDatatable from "../../components/datatable/DatatableSlider";


const ListSlider = () => {
    return (
    <div className="list">
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <SliderDatatable />
        </div>
    </div>
    );
};

export default ListSlider;
