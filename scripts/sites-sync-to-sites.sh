#!/bin/bash

# Remote ssh execution
ssh -T $SUNET@sites1.stanford.edu "SUNET=$SUNET SHORTNAME=$SHORTNAME /afs/ir/group/webservices/tools/geppetto/sync.sh"
