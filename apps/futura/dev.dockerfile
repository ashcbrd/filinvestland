FROM 206673267443.dkr.ecr.ap-southeast-1.amazonaws.com/fli-staging-base-image:dev

# ===================== Prepare ===================== #
WORKDIR /home/node/apps/futura

# ===================== Build application ===================== #
COPY ./package*.json .
RUN yarn install
COPY . .
RUN yarn build

# ===================== Expose web app's port ===================== #
EXPOSE 3000

# ===================== Start the web server ===================== #
CMD ["yarn", "start"]