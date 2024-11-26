# Start from the official Go base image
FROM golang:1.23 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum and install dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the Go application source code
COPY . .

# Build the Go application
RUN go build -o main .

# Start from a newer Debian image
FROM debian:bookworm-slim  

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled Go application from the builder stage
COPY --from=builder /app/main .

# Expose port 8000 (the port your Go API runs on)
EXPOSE 8000

# Command to run the Go application
CMD ["./main"]