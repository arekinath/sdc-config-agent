#!/bin/bash
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#

#
# Copyright (c) 2014, Joyent, Inc.
#

export SMFDIR=$npm_config_smfdir

if svcs config-agent; then
svcadm disable -s config-agent
svccfg delete config-agent
fi

rm -f "$SMFDIR/config-agent.xml"
