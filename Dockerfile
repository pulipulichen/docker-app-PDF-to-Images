FROM node:18.12-bullseye

RUN apt-get update

RUN apt-get install -y \
    poppler-utils

# COPY package.json /
# RUN npm install
RUN apt-get install -y \
    zip

CMD ["bash"]