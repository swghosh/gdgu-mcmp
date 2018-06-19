FROM python:3
# create app directory
WORKDIR /usr/src/app
# install app dependencies
COPY requirements.txt ./
RUN python3 -m pip install -r requirements.txt
# bundle app source
COPY . .
# start the app
CMD ["python3", "sensordatalogger.py"]
