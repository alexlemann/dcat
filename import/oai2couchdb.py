#aka oaijson
import sys

from oaipmh.client import Client
from oaipmh.metadata import MetadataRegistry, oai_dc_reader

import simplejson as json

import couchdb

server = couchdb.Server()
db = server['dcat']

URL = 'http://cardinalscholar.bsu.edu/cgi/oai2'

registry = MetadataRegistry()
registry.registerReader('oai_dc', oai_dc_reader)
client = Client(URL, registry)

records = client.listRecords(metadataPrefix='oai_dc')
i = 0
for hdr, metadata, _ in records:
   i = i + 1
   print hdr.identifier()
   print hdr.datestamp()
   map = metadata.getMap()
   map.update({ 'cdmcollection' : 'cardinalscholar' })
   db.save(map)
   print 'saved ' + str(i)
