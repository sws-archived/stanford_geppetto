#!/bin/bash

# Clean up the shortname if the @sse.ds_ parts are there.

CLEANNAME=${SHORTNAME/\@sse\./}
CLEANNAME=${CLEANNAME/ds\_/}

# Remote ssh execution
ssh -T $SUNET@sites1.stanford.edu "SUNET=$SUNET SHORTNAME=$CLEANAME /afs/ir/group/webservices/tools/geppetto/sync.sh"
