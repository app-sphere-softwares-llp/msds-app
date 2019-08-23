FROM nginx:alpine
LABEL author="Aashish Patil"
COPY ./dist /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx","-g","daemon off;"]
