// ProductList.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Container,
  Center,
  Spinner,
} from "@chakra-ui/react";

const ProductList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 12;

  const products = useSelector((state) =>
    state.products.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProducts(currentPage, pageSize));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, currentPage, pageSize]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Container maxW="90%">
      <Heading as="h1" my={4}>
        Product List
      </Heading>
      <Button as={Link} to="/create" colorScheme="teal" mb={4}>
        Create New Product
      </Button>

      <Center>
        <Stack direction="row" mt={4} spacing={4} marginBottom="20px">
          <Button
            onClick={prevPage}
            isDisabled={currentPage === 1}
            colorScheme="teal"
          >
            Previous
          </Button>
          <Button
            onClick={nextPage}
            isDisabled={products.length < pageSize || products.length === 0}
            colorScheme="teal"
          >
            Next
          </Button>
        </Stack>
      </Center>

      {loading ? (
        <Center>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
          {products.map((product) => (
            <Box key={product.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{product.name}</Heading>
              <Text mt={4}>Price: ${product.price}</Text>
              <Text mt={4}>{product.description}</Text>
              <Button
                as={Link}
                to={`/product/${product.id}`}
                mt={4}
                colorScheme="teal"
              >
                View Details
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default ProductList;
