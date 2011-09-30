====
dcat
====

dcat is a digital metadata catalog "multisearch" experiment. The idea behind the project is to create a common JSON format for independent of original metadata format. All of these formats are loaded into couchdb and indexed using elasticsearch coucdb river interface. Since elasticsearch allows HTTP based search queries, the entire search page can be written in a self contained HTML/JS page without any server side software other than the search index and metadatabase.

Screen Shot
-----------

.. image:: https://github.com/lemanal/dcat/raw/master/screenshot/dcat-screenshot1.png)]

Formats Supported
-----------------
  1. OAI / Dublin Core
  2. MARC
  3. ContentDM DC XML
