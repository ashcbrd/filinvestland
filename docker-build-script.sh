#!/bin/bash
# set -x #! FOR DEBUGGING...

# Array of directories to check for changes
DIRS=("apps/land" "apps/prestige" "apps/aspire" "apps/futura")
CMS_DIR="apps/cms"
IMAGE_PREFIX_NAME=$1

# Get list of directories that had changes in the latest commit
CHANGED_DIRS=$(git diff-tree --no-commit-id --name-only -r HEAD HEAD~1 | xargs -I {} dirname {} | sort | uniq)

build_and_run_if_changed() {
    local dir=$1
    # echo "Directory value inside function: ${dir}" #! FOR DEBUGGING...
    if echo "$CHANGED_DIRS" | grep -q "^$dir"; then
        echo "Changes detected in $dir. Building Docker image..."
        APP_NAME=$(echo $dir | cut -d'/' -f2)
        IMAGE_NAME="${IMAGE_PREFIX_NAME}-${APP_NAME}"
        docker build -t ${IMAGE_NAME}:$env -f $dir/$env.dockerfile $dir/ || {
            echo "Docker build failed for $dir."
            exit 1
        }

        if [ "$dir" == "$CMS_DIR" ]; then
            echo "Running the CMS Docker image..."
            docker compose -f docker-compose.cms.yml up -d --force-recreate
        fi
    else
        echo "No changes in $dir."
    fi
}

# Always process "cms" first
build_and_run_if_changed $CMS_DIR

# Then process the other directories
for dir in "${DIRS[@]}"; do
    # echo "Directory: ${dir}" #! FOR DEBUGGING...
    if echo "$CHANGED_DIRS" | grep -q "^$dir"; then
        build_and_run_if_changed $dir
    else
        echo "No changes in $dir."
    fi
done