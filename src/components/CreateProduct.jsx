import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
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

const CreateProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createProduct({ ...product, id: Date.now() }));
      navigate('/');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!product.name.trim()) {
      errors.name = 'Product Name is required';
    }
    if (!product.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(product.price) || parseFloat(product.price) <= 0) {
      errors.price = 'Price must be a valid number greater than 0';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <Container maxW="container.sm" marginTop="20px">
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading as="h1" mb={4}>Create New Product</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isInvalid={!!errors.name}>
            <FormLabel>Product Name</FormLabel>
            <Input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={!!errors.price}>
            <FormLabel>Price</FormLabel>
            <Input name="price" value={product.price} onChange={handleChange} placeholder="Price" />
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={product.description} onChange={handleChange} placeholder="Description" />
          </FormControl>
          <Flex justify="space-between" align="center">
            <Button onClick={() => navigate(-1)} colorScheme="gray">
              Back
            </Button>
            <Button type="submit" colorScheme="teal">
              Create
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProduct;
