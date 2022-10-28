# Use Python37
FROM python:3.10-slim
# Copy requirements.txt to the docker image and install packages
COPY requirements.txt /
RUN pip install -r requirements.txt
# Set the WORKDIR to be the folder
COPY . ./app
# Expose port 5000
EXPOSE 8080
ENV PORT 8080
WORKDIR /app
# Use gunicorn as the entrypoint
CMD exec gunicorn --bind :$PORT --workers 1 --threads 1 --timeout 0  main:app