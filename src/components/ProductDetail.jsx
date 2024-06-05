import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../actions/productActions';
import { useParams, Link } from 'react-router-dom';
import { Box, Button, Heading, Text, Container } from '@chakra-ui/react';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.selectedProduct);

  useEffect(() => {
    dispatch(fetchProduct(parseInt(id)));
  }, [dispatch, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.sm" marginTop="10px">
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading as="h1">{product.name}</Heading>
        <Text mt={4}>Price: ${product.price}</Text>
        <Text mt={4}>{product.description}</Text>
        <Button as={Link} to="/" mt={4} ml={2} colorScheme="gray" marginRight="20px">
          Back to Product List
        </Button>
        <Button as={Link} to={`/edit/${product.id}`} mt={4} colorScheme="teal">
          Edit Product
        </Button>
        
      </Box>
    </Container>
  );
};

export default ProductDetail;
