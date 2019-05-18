#!/bin/sh

mongoimport -d phylex-admin dump/users.json
mongoimport -d phylex-admin dump/roles.json
mongoimport -d phylex-admin dump/rules.json
mongoimport -d phylex-public -c clades dump/clades.json
