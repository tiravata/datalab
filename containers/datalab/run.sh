#!/bin/sh
# Copyright 2014 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This script allows running the docker container locally.
# Passing the 'shell' flag causes the docker container to break into a
# command prompt, rather than run the node.js server, which is useful
# for tinkering within the container before manually starting the server.

# In local mode the container picks up local notebooks, so it can be used
# to work on files saved on the file system.

ENTRYPOINT="/run-local.sh"
if [ "$1" == "shell" ]; then
  ENTRYPOINT="/bin/bash"
fi

# Home directories are mapped from host to boot2docker vm automatically,
# so use them for both logs and notebooks.
mkdir -p $HOME/datalab/log/custom_logs
mkdir -p $HOME/datalab/notebooks

# Delete any existing logs to start fresh on each run.
rm -f $HOME/datalab/log/custom_logs/*.log

docker run -i --entrypoint=$ENTRYPOINT \
  -p 8081:8080 \
  -v $HOME/datalab/log:/var/log/app_engine \
  -v $HOME/datalab/notebooks:/nb \
  -v $HOME/.config/gcloud:/root/.config/gcloud \
  -t datalab