FROM 206673267443.dkr.ecr.ap-southeast-1.amazonaws.com/fli-staging-base-image:dev as base

# ===================== This stage is meant for building the application ===================== #
FROM base as builder

WORKDIR /home/node/apps/cms
COPY . .

RUN yarn install
RUN yarn build

# =========== This stage is meant to set up the runtime environment for the application ============ #
FROM base as runtime

WORKDIR /home/node/apps/cms
COPY package*.json  .

# ===================== Installs only the production dependencies ===================== #
RUN yarn install --production

# ================ Copy necessary files/directories from builder stage for runtime ================== #
COPY --from=builder /home/node/apps/cms/dist ./dist
COPY --from=builder /home/node/apps/cms/build ./build
COPY --from=builder /home/node/apps/cms/assets ./assets

EXPOSE 9000

# ===================== Start the web server ====================== #
CMD ["yarn", "serve"]
