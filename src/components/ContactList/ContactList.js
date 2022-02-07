import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/store";

import s from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.contacts.items);
  console.log(items);
  const filter = useSelector((state) => state.contacts.filter);
  const contacts = items.filter((el) =>
    el.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.listItem} key={id}>
          <span>
            {name}: {number}
          </span>
          <button
            className={s.deleteButton}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
