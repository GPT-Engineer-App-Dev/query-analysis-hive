import { useState, useEffect } from "react";
import { Container, VStack, Box, Text, Spinner } from "@chakra-ui/react";

const MainContent = ({ query }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_API_KEY`);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.md" mt={4}>
      <VStack spacing={4}>
        {articles.map((article, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md" w="100%">
            <Text fontSize="xl" fontWeight="bold">{article.title}</Text>
            <Text mt={2}>{article.description}</Text>
            <Text mt={2} color="gray.500">{article.source.name}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default MainContent;