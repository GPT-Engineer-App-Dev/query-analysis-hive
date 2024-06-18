import { Container, VStack, Input, InputGroup, InputLeftElement, IconButton } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Index = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/articles?query=${query}`); // Navigate to the MainContent page with the query
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            onClick={handleSearch}
          />
        </InputGroup>
      </VStack>
    </Container>
  );
};

export default Index;