FROM python:3.10.16

RUN apt-get update && apt-get install -y wget

WORKDIR /app

COPY api_requirements.txt .
RUN pip install --no-cache-dir -r api_requirements.txt

COPY . .

EXPOSE 5000

CMD [ "python", "flask-api.py" ]