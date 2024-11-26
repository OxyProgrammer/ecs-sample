# Step 1: Use the Node.js image (version 22)
FROM node:22-alpine AS builder

# Step 2: Set the working directory inside the Docker image
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application's code to the Docker image
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Use another smaller image to save resources for serving the app
FROM node:22-alpine AS runner
WORKDIR /app

# Step 8: Copy the build output from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/package*.json ./

# Step 9: Install only necessary production dependencies
RUN npm install --production

# Step 10: Expose the application on port 3000
EXPOSE 3000

# Step 11: Define the command to start the application
CMD ["npm", "run", "start"]