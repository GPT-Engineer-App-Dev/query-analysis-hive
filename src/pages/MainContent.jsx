import { useState, useEffect } from "react";
import { Container, VStack, Box, Text, Spinner, Select, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

const MainContent = ({ query }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("relevance");
  const [filters, setFilters] = useState({
    date: false,
    source: false,
    relevance: true,
  });

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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Implement sorting logic here
  };

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
    // Implement filtering logic here
  };

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
        <Box w="100%">
          <Text fontSize="lg" fontWeight="bold">Sort By:</Text>
          <Select value={sortOption} onChange={handleSortChange}>
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </Select>
        </Box>
        <Box w="100%">
          <Text fontSize="lg" fontWeight="bold">Filters:</Text>
          <CheckboxGroup>
            <Stack spacing={2}>
              <Checkbox isChecked={filters.date} onChange={() => handleFilterChange("date")}>Date</Checkbox>
              <Checkbox isChecked={filters.source} onChange={() => handleFilterChange("source")}>Source</Checkbox>
              <Checkbox isChecked={filters.relevance} onChange={() => handleFilterChange("relevance")}>Relevance</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
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