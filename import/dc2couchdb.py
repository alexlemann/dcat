#!/usr/bin/env python
#dublin core to couchdb / json

from lxml import etree
import couchdb

dbsrv = couchdb.Server()
db = dbsrv['dcat']

f = open('oral_hist.xml', 'r')
tree = etree.parse(f)
f.close()

for record in tree.getroot():
   d = {}
   for record_attr in record:
       d.update({record_attr.tag : record_attr.text})
   #print d
   db.save(d)

