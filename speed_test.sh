time curl -XGET 'http://localhost:9200/_search' -d '{
    "explain" : true,
    "query" : {
        "term" : { "creator" : "Ball" }
    }
}
' > /dev/null
echo
time curl -XGET 'http://localhost:9200/_search?q=creator:ball' > /dev/null
echo
time curl -XGET 'http://localhost:9200/_search?q=description:issue' > /dev/null
echo
