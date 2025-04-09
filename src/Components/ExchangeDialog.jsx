import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { toast } from "sonner";

export default function ExchangeDialog({ book, isOpen, onOpenChange }) {
  const theme = useTheme();
  const [selectedBook, setSelectedBook] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const myBooks = [
    { id: "1", title: "The Great Gatsby" },
    { id: "2", title: "To Kill a Mockingbird" },
    { id: "3", title: "1984" },
    { id: "4", title: "The Catcher in the Rye" },
  ];

  const handleExchangeRequest = () => {
    if (!selectedBook) {
      toast.error("Please select a book to exchange");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      toast.success("Exchange request sent successfully!");
      setSelectedBook("");
      setMessage("");
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onClose={() => onOpenChange(false)} fullWidth maxWidth="md">
      {/* Brown header */}
      <Box
        sx={{
          backgroundColor: "#5D4037",
          color: "#fff",
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Book Details
        </Typography>
        <IconButton onClick={() => onOpenChange(false)} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 4 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
          {/* Left Section */}
          <Box sx={{ width: { xs: "100%", sm: "35%" } }}>
            <Box
              component="img"
              src={`http://localhost:5000${book.coverImageURL}`}
              alt={book.title}
              sx={{
                width: "100%",
                height: 250,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />

            <Box mt={2}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Condition:
              </Typography>
              <Chip label={book.condition} color="primary" size="small" />

              <Typography variant="body2" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                Genre:
              </Typography>
              <Chip label={book.genres} variant="outlined" size="small" />
            </Box>
          </Box>


          {/* Right Section */}
          <Stack spacing={2} flex={1}>
            <Typography variant="h5" fontWeight="bold">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              by {book.authors.join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {book.description}
            </Typography>

            <Divider sx={{ my: 1 }} />

            {/* Owner Info */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={
                  book.owner?.profileImageURL
                    ? `http://localhost:5000${book.owner.profileImageURL}`
                    : book.owner.fullName.charAt(0).toUpperCase() // or your fallback image URL
                }
              />
             


              <Box>
                <Typography variant="subtitle2">{book.owner.fullName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {book.owner?.exchangeCount || 0} exchanges
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Exchange Form */}
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Your Book</InputLabel>
                <Select
                  value={selectedBook}
                  label="Your Book"
                  onChange={(e) => setSelectedBook(e.target.value)}
                >
                  {myBooks.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Message (optional)"
                multiline
                minRows={3}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={handleExchangeRequest}
                disabled={loading}
                sx={{ alignSelf: "flex-start", mt: 1 }}
              >
                {loading ? "Sending..." : "Send Exchange Request"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
