$(function() {
   $(".button").click(function() {
      var query = $("#query").val();
      $.ajax({
         type: "GET",
         url: "http://localhost:9200/_search",
         dataType: 'json',
         data: 'q=' + query,
         success: function(data) {
            $('#results').empty();
            var items = [];
            var title = '';
            var link = '';
            $('<strong>' + data['hits']['total'] + ' Total Results</strong>').appendTo("#results");
            //$('<br /').appendTo('#results');
            $('<div style="float: right;"><strong>' + 'Took ' + data['took']/1000 + 's</strong></div>').appendTo("#results");
            $.each(data['hits']['hits'], function(i, record) {
                if ( typeof(record['_source']['Reference URL']) == 'string') {
                    link = record['_source']['Reference URL'];
                }
                else if ( typeof(record['_source']['relation']) != 'undefined' && typeof(record['_source']['relation'][0]) == 'string') {
                    link = record['_source']['relation'][0];
                }

                if ( typeof(record['_source']['title']) == 'string' ) {
                    title = record['_source']['title'];
                }
                else if ( typeof(record['_source']['Title']) == 'string' ) {
                    title = record['_source']['Title'];
                }
                else if ( typeof(record['_source']['Title proper']) != 'undefined' && typeof(record['_source']['Title proper'][0]) == 'string' ) {
                    title = record['_source']['Title proper'][0];
		    link = 'http://foo.com/';
		}
                else {
                    title = record['_source']['title'][0];
                }
                var li = '<li class="cdm"><a href="';
                if ( record['_source']['cdmcollection'] == 'cardinalscholar' ) {
                    li = '<li class="cardinalscholar"><a href="';
                }
                else if ( typeof(record['_source']['Title proper']) != 'undefined' && typeof(record['_source']['Title proper'][0]) == 'string' ) {
		    li = '<li class="cardcat"><a href="';
		}
                if ( link != '' ) {
                   items.push(li + link + '">' + title + '</a><div style="float: right; color: darkred;">' + record['_score'] + '</div></li>');
                }
                else {
                   items.push(li + title + '<div style="float: right; color: darkred;">' + record['_score'] + '</div></li>');
                }

            });
            $('<ul>', {
               html: items.join('')
            }).appendTo('#results');
            $('&lraquo; &raquo; ').appendTo('#pageinate_nav');
         }
      });
      return false;
   });
})
$(document).ready(function() {
      $.ajax({
         type: "GET",
         url: "http://localhost:9200/_status",
         dataType: 'json',
         data: 'q=' + query,
         success: function(data) {
            $('#index_info').empty();
            var num_docs = data['indices']['dcat']['docs']['num_docs'];
            $('<strong>Indexing: ' + num_docs + ' documents</strong>').appendTo('#index-status');
            //$('<strong>Indexing ' + num_docs '</strong>');//.appendTo('#index-status');
          } 
      }); 
} )
