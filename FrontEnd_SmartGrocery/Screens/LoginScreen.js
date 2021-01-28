import React from "react";
import { StyleSheet, Image,View } from "react-native";
import * as Yup from "yup";

import useAuth from "../auth/useAuth";
import Screen from "../Components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../Components/forms";
import API from '../API_ReactNative/API';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
    const auth=useAuth();
    const storeUser = async (value) => {
        try {
          await AsyncStorage.setItem('user', value)
        } catch (e) {
          // saving error
        }
      }
    async function make_signin_request(data_login){
        const Datato_Send={
            email:data_login.email,
            password:data_login.password
        };
        API.SignIn(Datato_Send).then(res => {
            const result = res;
            console.log("RESULT: ", result.data.user);
            
           if(res.data.success==false){
           

           }else{
            auth.logIn(res.data);
            storeUser(res.data.user.name);//user
            storeRole(res.data.user_role.role);//role
            storeToken_Storage(res.data.token);//token
            //check roles,navigate accordingly
            if(res.data.user_role.role=="store"){
              
              //store user,role,and token , then navigation will auto navigate to which role based we need;

         
              
               }else if(res.data.user_role.role=="customer"){
              
               }else if(res.data.user_role.role=="cashier"){
            
               }
           }
        }).catch(error => console.log("error",error));
    }

    const storeToken_Storage = async (value) => {
        try {
          await AsyncStorage.setItem('token', value)
        } catch (e) {
          // saving error
        }
      }
    
const storeRole = async (value) => {
  try {
    await AsyncStorage.setItem('role', value)
  } catch (e) {
    // saving error
  }
}

  return (
  
       <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/AI_Shopping.png")} />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) =>{
            make_signin_request(values);
        }}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
      </Screen>
     
  
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
