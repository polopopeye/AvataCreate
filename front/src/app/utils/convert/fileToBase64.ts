import React from 'react';

const fileToBase64 = async (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);

    return reader;
  });

export default fileToBase64;
