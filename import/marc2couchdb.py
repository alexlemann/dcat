#aka marc2json
import simplejson as json
import couchdb
from pymarc import MARCReader


marc_decoded = {
  '020' : 'ISBN',
  '022' : 'ISSN',
  '050' : 'LC #',
  '100' : 'Author',
  '110' : 'Corporate',
  '111' : 'Conference',
  '130' : 'Uniform title',
  '240' : 'Uniform title',
  '245' : 'Title proper',
  '246' : 'Distinctive Subtitle',
  '250' : 'Edition',
  '260' : 'Publishing info',
  '500' : 'General Notes',
  '508' : 'Motion picture credits',
  '511' : 'Participants',
  '520' : 'AV Summary',
  '600' : 'Person subject',
  '610' : 'Corporate subject',
  '611' : 'Corporate subject',
  '655' : 'Genre',
  '700' : 'Person',
}
server = couchdb.Server()
db = server['dcat']
filename = '/Users/alexlemann/Desktop/ballstatecat.mrc'
fd = open(filename, 'rU')
reader = MARCReader(fd, to_unicode=True)
cnt = 0
for r in reader:
  if cnt % 1000 == 0:
    print cnt
  cnt += 1
  marcjson = {}
  for f in r.get_fields():
    if marc_decoded.has_key(f.tag):
      field = marc_decoded[f.tag]
      marcjson.setdefault(field, [])
      marcjson[field].append(f.value())
  #print marcjson
  db.save(marcjson)
