import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import AppPicker from '../Components/AppPicker';
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../Components/forms";
import CategoryPickerItem from "../Components/CategoryPickerItem";
import Screen from "../Components/Screen";
import FormImagePicker from "../Components/forms/FormImagePicker";
import API from "../API_ReactNative/API";
import { Snackbar } from 'react-native-paper';


const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  mass: Yup.number().required().min(1).max(10000).label("Mass"),
  images: Yup.array().min(1, "Please select at least one image."),
});


function ListingEditScreen({ navigation }) {

  const category_initial = {
    id: 0,
    name: 'food'
  }
  const [fetchedcategories, setFetchedCategories] = useState([]);
  const [category, setCategory] = useState(category_initial);

  //snack bar react native paper
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);


  //fetch categories from backend
  function fetchcategories() {
    API.getCategories().then(res => {
      const result = res.data.categories;
      console.log("RESULT: ", result);
      // alert(result[1].name);
      if (res.data.success == false) {
      } else {

        setFetchedCategories(res.data.categories);
      }
    }).catch(error => console.log("error", error));
  }//end of fetch categories from backend



  const handleSubmit = async (product, { resetForm }) => {
    // alert('enterd handlsumbit')
    console.log('printing in handle submit');
    console.log(category.id);

    const data = new FormData();
    data.append("name", product.name);
    data.append("price", product.price);
    data.append("category_id", category.id);
    data.append("mass", product.mass);
    data.append("description", product.description);

    product.images.forEach((image, index) =>
      data.append("file", {
        name: "image" + index,
        type: "image/jpeg",
        uri: image,
      })
    );
    //send update request to backend
    API.addProduct(data).then(res => {
      const result = res.data;
      console.log("RESULT: ", result);
      const path = res.data.path;
      const fullpath = path;

      if (res.data.success == false) {
        //alert('failed insert');
      } else {
        // alert('success');
        onToggleSnackBar();
      }
    }).catch(error => console.log("error", error));

    resetForm();//reset the form ; so a new fresh product can be added ;
  };

  useEffect(() => {
    fetchcategories();
  }, []);


  return (
    <Screen style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
      >

        <Form
          initialValues={{
            name: "",
            price: "",
            mass: "",
            description: "",

            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="name" placeholder="Name" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="mass"
            placeholder="Mass"
            width={120}
          />
          {
            fetchedcategories != [] ? (<AppPicker
              onSelectItem={(item) => setCategory(item)}
              items={fetchedcategories}
              icon="apps"
              placeholder="Category"
              selectedItem={category}
            />) :
              (<AppPicker
                onSelectItem={(item) => setCategory(item)}
                items={fetchedcategories}
                icon="apps"
                placeholder="Category"
                selectedItem={category}
              />)
          }

          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Add Product" />
        </Form>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}

          action={{
            label: 'Close',
            onPress: () => {
              // Do something
            },
          }}>
          Product Added Succssefully
      </Snackbar>
      </ScrollView>

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
