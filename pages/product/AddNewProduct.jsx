import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from 'react';
import {Box, Container, FormControl, InputLabel, NativeSelect, Stack, TextField} from "@mui/material";
import NavBar from "../../component/NavBar/NavBar";

const AddNewProduct = () => {

  const [product, setProduct] = useState({
    lister: '', //Lister should be acquired in the backend.
    name: '',
    description: '',
    imagePath: ["/image.jpg"], //Dummy path to images for now. Don't know where to put the file yet.
    timeCreated: '',    //This should be acquired in the backend.
    transactionType: '',
    price: '',
    sellProgress: ''   //This should be defaulted to 0 in the backend.
  });




  async function addProductHandler(name, description, imagePath, transactionType, price) {
    const response = await fetch('/api/add_product', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        imagePath,
        transactionType,
        price
      }),
      headers: {'Content-Type': 'application/json'}


    });
    const product_data = await response.json();


  }

  return (
    <React.Fragment>
      <NavBar/>



      <Container id="product" justifyContent="left" maxWidth="sm">
        {/*这个box只是让你看到container的大小*/}
        <Box my={10} sx={{backgroundColor: 'white',}}>
          <Stack spacing={2.5} alignItems="center">
            <h2>List a Product</h2>
            <TextField
              id="outlined-basic"
              label="Product name"
              onChange={(v) => {
                setProduct({
                  ...product,
                  name: v.target.value,
                })
              }}
            />
            <TextField
              multiline={true}
              rows={3}
              id="outlined-basic"
              label="Product description"
              onChange={(v) => {
                setProduct({
                  ...product,
                  description: v.target.value,
                })
              }}
            />
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
              />
            </Button>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Method of Payment
              </InputLabel>
              <NativeSelect
                defaultValue={0}
                inputProps={{
                  name: 'paymentType',
                  id: 'uncontrolled-native',
                }}
                onChange={(v) => {
                  setProduct({
                    ...product,
                    transactionType: v.target.value,
                  })
                }}
              >
                <option value={0}>Select...</option>
                <option value={1}>Item Swap</option>
                <option value={2}>Venmo</option>
                <option value={3}>CashApp</option>
                <option value={4}>Other</option>
              </NativeSelect>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Price"
              onChange={(v) => {
                setProduct({
                  ...product,
                  price: v.target.value,
                })
              }}
            />
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                //console.log(user);
                addProductHandler(product.name, product.description, JSON.stringify(product.imagePath), product.transactionType, product.price);

                alert("product name: " + product.name + " description: " + product.description + " Image list: " + JSON.stringify(product.imagePath) + " transaction type: " + product.transactionType);
                // sent to backend and firebase
              }}
            >List the Item!</Button>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  )

}

export default AddNewProduct;