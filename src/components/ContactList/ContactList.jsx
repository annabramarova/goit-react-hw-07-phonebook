import { Loader } from 'components/Loader/Loader';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { selectContactsAmount, selectError, selectFilteredContacts,  selectFilteredTotalAmount,  selectIsLoading} from 'redux/selectors';

import {
  List,
  ListItem,
  ListText,
  Button,
  ListEmpty,
} from './ContactList.styled';


const ContactList = () => {
  const filtered = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contactsAmount = useSelector(selectContactsAmount);
  const filteredAmount = useSelector(selectFilteredTotalAmount);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  

  return (
    <Fragment>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {contactsAmount === 0 && <ListEmpty>Contacts list is empty</ListEmpty>}
      {filteredAmount=== 0 && <ListEmpty>Contact not found. Please try again or add a new one</ListEmpty>}
      <List>
          {filtered.map(({ id, name, number }) => (
            <ListItem key={id}>
              <ListText>{name}:  {number} </ListText>
              <Button type="button"
                onClick={() => dispatch(deleteContact(id))}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
    </Fragment>
  );
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;