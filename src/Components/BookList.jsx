import React from 'react';
import { Typography, Stack, Box } from '@mui/material';
import NewBookCard from './NewBookCard'; // This is your card component

const BookList = ({ books }) => {
  return (
    <Box sx={{ padding: 3 }}>
      {books.length > 0 ? (
        <Stack direction="row" flexWrap="wrap" spacing={3}>
          {books.map((book) => (
            <NewBookCard key={book._id} book={book} />
          ))}
        </Stack>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: 'gray' }}>
          No books available.
        </Typography>
      )}
    </Box>
  );
};

export default BookList;
