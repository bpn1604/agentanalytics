import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, updateProduct } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Container,
  FormErrorMessage,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.selectedProduct);
  const [updatedProduct, setUpdatedProduct] = useState(product || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!product) {
      dispatch(fetchProduct(parseInt(id)));
    } else {
      setUpdatedProduct(product);
    }
  }, [dispatch, id, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateProduct(updatedProduct));
      navigate('/');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!updatedProduct.name.trim()) {
      errors.name = 'Product Name is required';
    }
    if (!updatedProduct.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(updatedProduct.price) || parseFloat(updatedProduct.price) <= 0) {
      errors.price = 'Price must be a valid number greater than 0';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (!updatedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.sm" marginTop="20px">
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading as="h1" mb={4}>Edit Product</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isInvalid={!!errors.name}>
            <FormLabel>Product Name</FormLabel>
            <Input name="name" value={updatedProduct.name} onChange={handleChange} placeholder="Product Name" />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={!!errors.price}>
            <FormLabel>Price</FormLabel>
            <Input name="price" value={updatedProduct.price} onChange={handleChange} placeholder="Price" />
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={updatedProduct.description} onChange={handleChange} placeholder="Description" />
          </FormControl>
          <Flex justify="space-between" align="center">
            <Button onClick={() => navigate(-1)} colorScheme="gray">
              Back
            </Button>
            <Button type="submit" colorScheme="teal">
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default EditProduct;
