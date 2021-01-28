import axios from 'axios';

const BASE_API_URL = 'http://192.168.0.102:8000/api';

//let token = localStorage.getItem('token');
   // axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
export default {//update_image
    getCategories: () => 
        axios.get(BASE_API_URL+"/categories"),
        getAllProducts_Images_AllStores: () => 
        axios.get(BASE_API_URL+"/products_w_images_all"),
        getAllMembers: () => 
        axios.get(BASE_API_URL+"/allmembers"),
        getAllCustomers: () => 
        axios.get(BASE_API_URL+"/customers"),
        getAllCashiers: () => 
        axios.get(BASE_API_URL+"/cashiers"),
        getAllProducts: () => 
        axios.get(BASE_API_URL+"/products"),
        getAllProductsWithImages: () => 
        axios.get(BASE_API_URL+"/products_w_images"),
        getAllProductsWithImages_Customer: () => 
        axios.get(BASE_API_URL+"/products_w_images_customer"),
        getAllProductsWithImages_Trial: () => 
        axios.get(BASE_API_URL+"/products_w_images_trial_reactnative"),
        getStores: () => 
        axios.get(BASE_API_URL+"/stores"),
        getBillsCashier_UnDone: () => 
        axios.get(BASE_API_URL+"/bills_notdone"),
        getAllCategories: () => 
        axios.get(BASE_API_URL+"/categories"),
        getProductByName_Customer: (name) => 
        axios.get(BASE_API_URL+"/productbyname_customer/"+name),
    getAllCashierss: (id) =>
        axios.get(`${BASE_API_URL}+"/posts/${id}/edit`),
    SignIn: (post) =>
        axios.post(BASE_API_URL+"/login", post),
        setBillDone: (post) =>
        axios.put(BASE_API_URL+"/setbilldone", post),
        insertImage: (post) =>
        axios.post(BASE_API_URL+"/insertimage", post),
        insertBill: (post) =>
        axios.post(BASE_API_URL+"/bill", post),
        addProduct: (post) =>
        axios.post(BASE_API_URL+"/product", post),
        updateImage_User: (post) =>
        axios.post(BASE_API_URL+"/update_image", post),
        editProduct: (post) =>
        axios.post(BASE_API_URL+"/product_edit", post),
        deletemember: (id) =>
        axios.delete(BASE_API_URL+"/user/"+id),
        deleteproduct: (id) =>
        axios.delete(BASE_API_URL+"/product/"+id),
        Register_Customer: (post) =>
        axios.post(BASE_API_URL+"/register_customer", post),
        Register_Store: (post) =>
        axios.post(BASE_API_URL+"/register_store", post),
        addPost: (post) =>
        axios.post('{BASE_API_URL}/posts/', post),
    updatePost: (post, id) =>
        axios.put(`${BASE_API_URL}/posts/${id}`, post),
    deleteimage: (id) =>
        axios.delete(`${BASE_API_URL}/gallery/${id}`),
       
        //online orders API
        setCashier_Order: (post) =>
        axios.post(BASE_API_URL+"/setcashier_order", post),
        getAllOrders_Cashier: () => 
        axios.get(BASE_API_URL+"/orders_cashier"),
        addOrder: (post) =>
        axios.post(BASE_API_URL+"/order", post),

        //expo notification API
        sendNotification: (post,headerstosend) =>
        axios.post("https://exp.host/--/api/v2/push/send", post,headerstosend),
        updateNotification_Token: (post) =>
        axios.post(BASE_API_URL+"/update_expotoken", post),
    }
