import AttributesWrapperModal from "../attributes/attributesWrapper/AttributesWrapperModal";
import Container from "../container/containerWrapper/Container";
import Sidebar from "../sidebar/sidebarContainer/Sidebar";
import styles from "./DragDrop.module.css";
function DragDrop() {
  return (
    <div className={styles.dragDrop}>
      <Sidebar />
      <Container />
      <AttributesWrapperModal />
    </div>
  );
}

export default DragDrop;
