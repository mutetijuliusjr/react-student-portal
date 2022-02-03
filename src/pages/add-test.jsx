import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSchoolAsync } from '../redux/schoolSlice';
import { 
  Page, 
  Button,
  BlockTitle,
  Navbar,
  List,
  ListInput,
} from 'framework7-react';


const AddTestPage = () => {
  
  const [name_value, setName] = useState('');
  const [desc_value, setDesc] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    
    if (name_value) {
			dispatch(
				addSchoolAsync({
          name: name_value,
          description: desc_value
				})
			);
		}
    
  };


  return (
  <Page>
    <Navbar title="New School" backLink="Back" />
    <BlockTitle>Fill Form</BlockTitle>
    <form onSubmit = {onSubmit}>
      <List noHairlinesBetween="true">
          <ListInput
              outline
              name="name"
              label="Name"
              floatingLabel
              type="text"
              value={name_value}
              placeholder="Your name"
              onChange={(event) => setName(event.target.value)}
          ></ListInput>       
      </List>
      <List noHairlinesBetween="true">
          <ListInput
              outline
              name="description"
              label="Description"
              floatingLabel
              type="textarea"
              value={desc_value}
              onChange={(event) => setDesc(event.target.value)}
          ></ListInput>       
      </List>
      <Button raised round type="submit" fill color="green" text="Submit" />
    </form>

  </Page>
  );
};

export default AddTestPage;