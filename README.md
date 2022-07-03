# S22-12-D-FashionFever

## Description

Fashion Fever is a web application that will generate images based on given descriptions with a technique called Text to Image Generation. We will be employing Generative Adversarial Networks for generation tasks whereas we will be using Text Encoding to extract useful information from given descriptions.

## Tools used

- Python
- Pytorch
- NLTK
- React.js
- Express.js

## Dataset

We are using FashionGen dataset as well as we plan to collect our own dataset for eastern clothing options(mainly due to how Women clothing in FashionGen is very culturally inappropriate for Middle East)

FashionGen is available here: https://drive.google.com/file/d/1Wi0pljcAbY7XR9CTRFfYJmUGAPDD-gGM/view

## Manual

The steps involved for using our project are as follows:

- Install dependencies:
  -- Pytorch.
  -- Numpy.
  -- H5py.
  -- PIL.
  -- Sci-kit image.
  -- NLTK.
  -- Pickle.
  -- Flask
- Go to the attnGAN folder and run server.py file.
- Go to the React frontend project file and use the command ‘npm start’ in the command prompt.
- Provide textual description for desired clothing preference in the input text area.
- View/Save the generated image of clothings.
