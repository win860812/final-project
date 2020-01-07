var API_URL = "https://ie423ja9xf.execute-api.us-east-2.amazonaws.com/prod/doctor";

$(document).ready(function () {
    //create XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();

    //httpGet function (send request to dynamodb)
    function httpGet(theUrl, callback) {
      xmlhttp.open('GET', theUrl, true);
      xmlhttp.onload = function () {
        var data = JSON.parse(this.response);
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
          console.log('success read doctor');
        } else {
          console.log('error read doctor');
        }
        callback(data);
      };
      xmlhttp.send();
    }
    //dynamodb_read_doctor function
    function dynamodb_read_doctor() {
      httpGet(API_URL, function (read) {
        var i, j;
        //selection sort
        for(i=0;i<read.Count;i++){
          if(read.Items[i].rating==undefined){
            read.Items[i].rating="";
          }
        }
        for (i = 0; i < read.Count; i++) {
          var max = i;
          var empty = 0;
          for (j = i + 1; j < read.Count; j++) {
            if (Number(read.Items[j].rating) > Number(read.Items[max].rating)) {
              max = j;
            }
          }
          var temp = read.Items[i];
          read.Items[i] = read.Items[max];
          read.Items[max] = temp;
        }
        var table_body = '<table border="1" id="example"><thead><tr><th id="name" width="9%">Name</th><th id="pro" width="80%">Pro</th><th id="rating" width="10%">推薦度</th><th id="link" width="1%">Link</th></tr></thead><tbody>';
        for (i = 0; i < read.Count; i++) {
          table_body += '<tr>';

          table_body += '<td>';
          table_body += read.Items[i].name;
          table_body += '</td>';

          table_body += '<td>';
          table_body += read.Items[i].pro;
          table_body += '</td>';

          table_body += '<td>';
          table_body += read.Items[i].rating;
          
          if(read.Items[i].rating.length!=0)
          {
            table_body +="%";
          }
          
          table_body += '</td>';

          var link = '<a href="url">link text</a>';
          link = '<a target="_blank" href="https://wd.vghtpe.gov.tw/Teacher.action?tid=';
          link += read.Items[i].tid;
          link += '">詳細資訊</a>';
          table_body += '<td>';
          table_body += link;
          table_body += '</td>';

          table_body += '<td id="user" style="display:none">';
          table_body += read.Items[i].pro_hide;
          table_body += '</td>';

          table_body += '</tr>';
        }
        table_body += '</tbody></table>';
        $('#tableDiv').html(table_body);
      });
    }

    dynamodb_read_doctor();

  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("table tr").filter(function (index) {
      if (index > 0) {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      
      
        
      }
    });
  });
  //=================End=========================End===============================
});