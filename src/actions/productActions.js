import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const API_URL = '/mockData.json';
console.log(API_URL)

export const fetchProducts = () => async (dispatch) => {
  const response = await axios.get("https://agentanalytics-json-1.onrender.com/products");
 
  
  console.log(response)
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`https://agentanalytics-json-1.onrender.com/products/${id}`);
    dispatch({ type: FETCH_PRODUCT, payload: response.data });
  } catch (error) {
    console.error('Error fetching product:', error);
    
  }
};


export const createProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post('https://agentanalytics-json-1.onrender.com/products', product);
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
  } catch (error) {
    console.error('Error creating product:', error);
    // Handle error, dispatch an action, show an error message, etc.
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.put(`https://agentanalytics-json-1.onrender.com/products/${product.id}`, product);
    dispatch({ type: UPDATE_PRODUCT, payload: response.data });
  } catch (error) {
    console.error('Error updating product:', error);
    // Handle error, dispatch an action, show an error message, etc.
  }
};


