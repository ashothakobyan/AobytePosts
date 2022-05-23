import { useDispatch } from "react-redux";
import { sideBarSchema } from "../../../config/sideBarConfig";
import { removeLastElement } from "../../../redux/formBuilderSlice";
import SidebarFormElement from "../sidebarFormElement/SidebarFormElement";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(removeLastElement());
  };

  return (
    <div className={styles.sidebar}>
      {sideBarSchema.map((el, index) => (
        <SidebarFormElement key={index} name={el.name} />
      ))}
      <button className={styles.button} onClick={onClickHandler}>
        Redo
      </button>
    </div>
  );
}

export default Sidebar;
