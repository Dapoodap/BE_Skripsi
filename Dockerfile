# Gunakan node versi 18 sebagai base image
FROM node:18

# Copy package.json dan package-lock.json untuk menginstall dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Copy seluruh proyek ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 8080

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]
