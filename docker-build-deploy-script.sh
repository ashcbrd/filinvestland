#!/bin/bash
# set -x #! FOR DEBUGGING...

# Array of directories to check for changes
DIRS=("apps/land" "apps/prestige" "apps/aspire" "apps/futura")
CMS_DIR="apps/cms"
IMAGE_PREFIX_NAME=$1

# Mapping directories to their respective CDN distribution IDs
declare -A CDN_DISTRIBUTION_IDS
CDN_DISTRIBUTION_IDS["apps/land"]="E3H18LLPJ3SHR1"
CDN_DISTRIBUTION_IDS["apps/prestige"]="E2G558YT1OEDAQ"
CDN_DISTRIBUTION_IDS["apps/aspire"]="E2BRX6QNTSRKEH"
CDN_DISTRIBUTION_IDS["apps/futura"]="E1W0OY5QQD83SJ"

# Get list of directories that had changes in the latest commit
CHANGED_DIRS=$(git diff-tree --no-commit-id --name-only -r HEAD HEAD~19 | xargs -I {} dirname {} | sort | uniq)

# Flag to track if a change was detected
CHANGE_DETECTED=false

build_and_run_if_changed() {
    local dir=$1
    local distribution_id=${CDN_DISTRIBUTION_IDS[$dir]}

    # echo "Directory value inside function: ${dir}" #! FOR DEBUGGING...
    if echo "$CHANGED_DIRS" | grep -q "^$dir"; then
        CHANGE_DETECTED=true

        echo "[INFO] Changes detected in $dir. Building Docker ${APP_NAME} image..."
        APP_NAME=$(echo $dir | cut -d'/' -f2)
            if [ "$dir" == "apps/land" ]; then
                APP_NAME="corp"
            fi
        IMAGE_NAME="${IMAGE_PREFIX_NAME}-${APP_NAME}"

        if docker build -t ${IMAGE_NAME}:$env -f $dir/$env.dockerfile $dir/; then
            
            docker push ${IMAGE_NAME}:$env

            # Invalidate CDN files if changes are detected (Applicable for land, aspire, prestige, and futura only)
            if [ -n "$distribution_id" ]; then
                echo "[INFO] Invalidating CDN files for $dir..."
                aws cloudfront create-invalidation --distribution-id $distribution_id --paths "/*"
            else
                echo "[INFO] No CDN distribution is set for $APP_NAME, skipping..."
            fi
        else
            echo "[INFO] Docker build failed for $dir."
            exit 1
        fi

        #! Always build and deploy CMS first when a change is detected.
        if [ "$dir" == "$CMS_DIR" ]; then
            echo "[INFO] Deploy CMS Docker image..."
            aws autoscaling start-instance-refresh --cli-input-json file://${APP_NAME}-instance-refresh-config.json
        fi
    else
        echo "[INFO] No changes in $dir."
    fi
}

build_and_run_if_changed $CMS_DIR

for dir in "${DIRS[@]}"; do
    # echo "Directory: ${dir}" #! FOR DEBUGGING...
    if echo "$CHANGED_DIRS" | grep -q "^$dir"; then
        build_and_run_if_changed $dir
    else
        echo "[INFO] No changes in $dir."
    fi
done

# Start instance refresh only if changes were detected in land, aspire, prestige, and futura
if [ "$CHANGE_DETECTED" = true ]; then
    echo "Starting instance refresh for the websites..."
    aws autoscaling start-instance-refresh --cli-input-json file://websites-instance-refresh-config.json
fi
