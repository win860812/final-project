(function () {
    'use strict';

    /*--------------------initialization start--------------------*/
    document.body.id = "veterans";

    /*
    step 1
    get user_id and user_email from background.js
    */

    var main_container = document.createElement("div");
    main_container.id = "main_container";
    main_container.setAttribute("class", "container");
    main_container.style.backgroundColor = "#F6F6F6";
    main_container.style.width = "100%";
    main_container.style.minHeight = "1000px";

    //create top_div
    var top_div = document.createElement("div");
    top_div.id = "top";
    top_div.setAttribute('class', 'card');

    top_div.style.position = "relative";
    top_div.style.width = "250px";
    top_div.style.height = "220px";
    top_div.style.marginRight = "15px";
    top_div.style.top = "10px";
    //top_div.style.margin = "0 auto";
    var w = window.innerWidth - 280;
    w += "px";
    top_div.style.left = w;

    top_div.style.borderRadius = '12px';
    top_div.boxShadow = '2px 8px 45px rgba(0, 0, 0, .15)';
    top_div.style.backgroundColor = "white";

    window.onresize = function () {
        w = window.innerWidth - 280;
        w += "px";
        top_div.style.left = w;
    };

    /*top_div.style.borderStyle='dashed';
    top_div.style.borderColor='blue';*/

    //send message to  background.js
    chrome.runtime.sendMessage("getUserInfo", function (response) {
        //create user_id_label
        var user_id_label = document.createElement("label");
        user_id_label.innerText = response.id;
        user_id_label.id = "user_id";
        user_id_label.style.display = "none";

        //create user_email_label
        var user_email_label = document.createElement("label");
        user_email_label.innerText = response.email;
        user_email_label.id = "user_email";
        user_email_label.style.display = "none";

        //append user_id_label and user_email_label to top_div
        top_div.appendChild(user_id_label);
        top_div.appendChild(user_email_label);
        var login_status = document.createElement("h1");
        login_status.textContent = "登入狀態";
        login_status.style.color = 'white';
        login_status.style.backgroundImage = 'linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)';
        login_status.style.borderRadius = "12px 12px 0px 0px";
        //login_status.boxShadow='2px 8px 45px rgba(0, 0, 0, .15)'; 

        top_div.appendChild(login_status);
    });

    //create user_id and user_email
    var user_id;
    var user_email;

    //determine if user has logged in
    setTimeout(function () {
        user_id = document.getElementById("user_id").innerText;
        user_email = document.getElementById("user_email").innerText;
        var login_message = document.createElement("p");
        var login_message_2 = document.createElement("p");
        if (user_id == "" && user_email == "") {
            send_button.disabled = true;
            login_message.textContent = "您尚未登入Google帳號，不能進行評論，也無法進行推噓評論";
            login_message_2.textContent = "請於登入後點擊下方按鈕重新整理";
            top_div.appendChild(login_message);
            top_div.appendChild(login_message_2);
            top_div.appendChild(google_account_button);
        } else {
            login_message.textContent = "你已登入Google帳號: " + user_email;
            login_message_2.textContent = "若要清除登入資訊，請於登出後點擊下方按鈕重新整理";
            top_div.appendChild(login_message);
            top_div.appendChild(login_message_2);
            top_div.appendChild(google_account_button);
        }
    }, 1000);


    //create google_account_button
    var google_account_button = document.createElement("button");
    google_account_button.type = "button";
    google_account_button.id = "google_button";
    google_account_button.style.position = "relative";
    google_account_button.style.left = "10px";
    var google_account_button_textnode = document.createTextNode("重新整理");
    google_account_button.appendChild(google_account_button_textnode);

    //google_account_button event
    setTimeout(function () {
        document.getElementById("google_button").onclick = function () {
            chrome.runtime.sendMessage("reload", function (response) {
                location.reload();
            });
        };
    }, 1100);


    /*
    step 2
    get doctor information
    */

    //create doctor_name
    var query_result = document.querySelector(".margin-reset");
    var doctor_name = document.createElement("h1");
    doctor_name.id = "doctor_name";
    doctor_name.textContent = query_result.innerText;
    doctor_name.style.color = 'white';
    doctor_name.style.backgroundImage = "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";
    doctor_name.style.borderRadius = "12px 12px 0px 0px";

    //create doctor_name_div
    var doctor_name_div = document.createElement("div");
    doctor_name_div.id = "doctor_name_div";
    doctor_name_div.setAttribute("class", "card");

    //doctor_name_div.style.position = "relative";
    //doctor_name_div.style.marginLeft = "15px";
    doctor_name_div.style.position = "fixed";
    doctor_name_div.style.left = "15px";
    doctor_name_div.style.top = "15px";
    doctor_name_div.style.width = "300px";
    doctor_name_div.style.height = "200px";
    doctor_name_div.style.borderRadius = "12px";
    doctor_name_div.style.backgroundColor = "white";
    doctor_name_div.appendChild(doctor_name);
    doctor_name_div.innerHTML += "資料載入中...";

    //create doctor_id
    var doctor_id = getUrlVars();

    //function for URL parameter
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    /*
    step 3
    user anonymous or public radio
    */

    //create patient_name_anonymous_radio
    var patient_name_anonymous_radio = document.createElement("input");
    patient_name_anonymous_radio.type = "radio";
    patient_name_anonymous_radio.checked = true;

    patient_name_anonymous_radio.style.marginLeft = "10px";

    //create patient_name_anonymous_textnode
    var patient_name_anonymous_textnode = document.createTextNode("匿名");

    //create patient_name_public_radio
    var patient_name_public_radio = document.createElement("input");
    patient_name_public_radio.type = "radio";

    //create patient_name_public_textnode
    var patient_name_public_textnode = document.createTextNode("公開(使用Google帳號)");

    //create patient_name_p
    var patient_name_p = document.createElement("p");
    patient_name_p.textContent = "評論者:";
    patient_name_p.style.fontSize = "16px";
    patient_name_p.style.height = "10px";

    //create patient_name_div
    var patient_name_div = document.createElement("div");

    //append above to patient_name_div
    patient_name_div.appendChild(patient_name_p);
    patient_name_div.appendChild(patient_name_anonymous_radio);
    patient_name_div.appendChild(patient_name_anonymous_textnode);
    patient_name_div.appendChild(patient_name_public_radio);
    patient_name_div.appendChild(patient_name_public_textnode);

    //create patient_name (default is anonymous)
    var patient_name = "匿名";

    //patient_name_anonymous_radio event
    patient_name_anonymous_radio.onclick = function () {
        if (patient_name_public_radio.checked == true) {
            patient_name_public_radio.checked = false;
        } else {
            patient_name_anonymous_radio.checked = true;
        }
        patient_name = "匿名";
    };

    //patient_name_public_radio event
    patient_name_public_radio.onclick = function () {
        if (patient_name_anonymous_radio.checked == true) {
            patient_name_anonymous_radio.checked = false;
        } else {
            patient_name_public_radio.checked = true;
        }
        patient_name = user_email;
    };

    /*
    step 4
    user comment textarea
    */

    //create enter_comment_textarea
    var enter_comment_textarea = document.createElement("textarea");
    enter_comment_textarea.style.marginLeft = "10px";

    var patient_comment_heading = document.createElement("p");
    patient_comment_heading.textContent = "評論內容:";
    patient_comment_heading.style.fontSize = "16px";
    patient_comment_heading.style.height = "10px";

    //create patient_comment_div
    var patient_comment_div = document.createElement("div");
    patient_comment_div.appendChild(patient_comment_heading);

    //append enter_comment_textarea to patient_comment_div
    patient_comment_div.appendChild(enter_comment_textarea);

    //create enter_illness_input
    var enter_illness_textarea = document.createElement("textarea");
    enter_illness_textarea.style.marginLeft = "10px";

    var illness_heading = document.createElement("p");
    illness_heading.textContent = "輸入病症:";
    illness_heading.style.fontSize = "16px";
    illness_heading.style.height = "10px";

    var illness_div = document.createElement("div");
    illness_div.appendChild(illness_heading);
    illness_div.appendChild(enter_illness_textarea);

    /*
    step 5
    user recommend or not_recommend radio
    */

    //create recommend_radio
    var recommend_radio = document.createElement("input");
    recommend_radio.type = "radio";
    recommend_radio.value = "y";
    recommend_radio.checked = true;
    recommend_radio.style.marginLeft = "10px";

    //create recommend_textnode
    var recommend_textnode = document.createTextNode("推薦");

    //create not_recommend_radio
    var not_recommend_radio = document.createElement("input");
    not_recommend_radio.type = "radio";
    not_recommend_radio.value = "n";

    //create not_recommend_textnode
    var not_recommend_textnode = document.createTextNode("不推薦");

    var recommend_doctor_heading = document.createElement("p");
    recommend_doctor_heading.textContent = "您是否推薦此醫生?";
    recommend_doctor_heading.style.fontSize = "16px";
    recommend_doctor_heading.style.height = "10px";

    //create recommend_doctor_div
    var recommend_doctor_div = document.createElement("div");
    recommend_doctor_div.appendChild(recommend_doctor_heading);

    //append above to recommend_doctor_div
    recommend_doctor_div.appendChild(recommend_radio);
    recommend_doctor_div.appendChild(recommend_textnode);
    recommend_doctor_div.appendChild(not_recommend_radio);
    recommend_doctor_div.appendChild(not_recommend_textnode);

    //create recommend (default is recommend)
    var recommend = "y";

    //recommend_radio event
    recommend_radio.onclick = function () {
        if (not_recommend_radio.checked == true) {
            not_recommend_radio.checked = false;
        } else {
            recommend_radio.checked = true;
        }
        recommend = "y";
    };

    //not_recommend_radio event
    not_recommend_radio.onclick = function () {
        if (recommend_radio.checked == true) {
            recommend_radio.checked = false;
        } else {
            not_recommend_radio.checked = true;
        }
        recommend = "n";
    };

    /*
    step 6
    send comment button
    */

    //create send_button
    var send_button = document.createElement("button");
    send_button.type = "button";
    send_button.style.marginLeft = "10px";
    var send_button_text = document.createTextNode("送出");
    send_button.appendChild(send_button_text);

    //create send_div
    var send_div = document.createElement("div");
    send_div.id = "send_div";
    send_div.appendChild(send_button);

    /*
    step 6.5
    all comment input element
    */

    //cerate comment_input_div
    var comment_input_div = document.createElement("div");
    comment_input_div.setAttribute("class", "card");
    comment_input_div.height = "220px";
    comment_input_div.style.position = "fixed";
    comment_input_div.style.left = "15px";
    comment_input_div.style.bottom = "15px";
    comment_input_div.style.borderRadius = "12px";
    comment_input_div.style.minWidth = "300px";
    comment_input_div.style.minHeight = "390px";
    comment_input_div.style.background = "white";

    var comment_input_heading = document.createElement("h1");
    comment_input_heading.textContent = "留下評論";
    comment_input_heading.style.backgroundImage = "linear-gradient(120deg, #ff9a9e 0%, #fecfef 100%)";
    comment_input_heading.style.borderRadius = "12px 12px 0px 0px";
    comment_input_heading.style.color = "white";

    comment_input_div.appendChild(comment_input_heading);
    comment_input_div.appendChild(patient_name_div);
    comment_input_div.appendChild(illness_div);
    comment_input_div.appendChild(patient_comment_div);
    comment_input_div.appendChild(recommend_doctor_div);
    comment_input_div.appendChild(send_div);

    /*
    step 7
    comment category checkbox
    */

    //create comment_category_recommend_checkbox and comment_category_recommend_texe
    var comment_category_recommend_checkbox = document.createElement("input");
    comment_category_recommend_checkbox.id = "cb1";
    comment_category_recommend_checkbox.type = "checkbox";
    comment_category_recommend_checkbox.checked = true;
    var comment_category_recommend_text = document.createElement("p");
    comment_category_recommend_text.textContent = "推薦";
    comment_category_recommend_text.style.position = "relative";
    comment_category_recommend_text.style.left = "-5px";

    //create comment_category_not_recommend_checkbox and comment_category_not_recommend_text
    var comment_category_not_recommend_checkbox = document.createElement("input");
    comment_category_not_recommend_checkbox.id = "cb2";
    comment_category_not_recommend_checkbox.type = "checkbox";
    comment_category_not_recommend_checkbox.checked = true;
    var comment_category_not_recommend_text = document.createElement("p");
    comment_category_not_recommend_text.textContent = "不推薦";
    comment_category_not_recommend_text.style.position = "relative";
    comment_category_not_recommend_text.style.left = "-5px";

    //create comment_category_anonymous_checkbox and comment_category_anonymous_text
    var comment_category_anonymous_checkbox = document.createElement("input");
    comment_category_anonymous_checkbox.id = "cb3";
    comment_category_anonymous_checkbox.type = "checkbox";
    comment_category_anonymous_checkbox.checked = true;
    var comment_category_anonymous_text = document.createElement("p");
    comment_category_anonymous_text.textContent = "匿名";
    comment_category_anonymous_text.style.position = "relative";
    comment_category_anonymous_text.style.left = "-5px";

    //create comment_category_public_checkbox and comment_category_public_text
    var comment_category_public_checkbox = document.createElement("input");
    comment_category_public_checkbox.id = "cb4";
    comment_category_public_checkbox.type = "checkbox";
    comment_category_public_checkbox.checked = true;
    var comment_category_public_text = document.createElement("p");
    comment_category_public_text.textContent = "公開";
    comment_category_public_text.style.position = "relative";
    comment_category_public_text.style.left = "-5px";

    //create comment_category_div
    var comment_category_div = document.createElement("div");
    comment_category_div.setAttribute("class", "card");
    comment_category_div.style.margin = "0 auto";
    comment_category_div.style.background = "white";
    comment_category_div.style.width = "1200px";
    //comment_category_div.style.minHeight = "30px";
    comment_category_div.style.position = "relative";
    comment_category_div.style.top = "-190px";
    comment_category_div.style.display = "flex";

    var comment_category_heading = document.createElement("P");
    comment_category_heading.textContent = "評論分類：";

    //append above to comment_category_div
    comment_category_div.appendChild(comment_category_heading);
    comment_category_div.appendChild(comment_category_recommend_checkbox);
    comment_category_div.appendChild(comment_category_recommend_text);
    comment_category_div.appendChild(comment_category_not_recommend_checkbox);
    comment_category_div.appendChild(comment_category_not_recommend_text);
    comment_category_div.appendChild(comment_category_anonymous_checkbox);
    comment_category_div.appendChild(comment_category_anonymous_text);
    comment_category_div.appendChild(comment_category_public_checkbox);
    comment_category_div.appendChild(comment_category_public_text);

    var hot_comment_heading = document.createElement("h1");
    hot_comment_heading.textContent = "熱門評論";
    hot_comment_heading.style.backgroundImage = "linear-gradient(120deg, #ffc3a0 0%, #ffafbd 100%)";
    hot_comment_heading.style.borderRadius = "12px 12px 0px 0px";
    hot_comment_heading.style.color = "white";
    hot_comment_heading.style.width = "1200px";
    hot_comment_heading.style.margin = "0 auto";
    hot_comment_heading.style.position = "relative";
    hot_comment_heading.style.top = "-210px";



    //create hot_comment_div
    var hot_comment_div = document.createElement("div");
    hot_comment_div.id = "hot_comment_div";
    hot_comment_div.innerHTML += "資料載入中...";

    hot_comment_div.setAttribute("class", "card");
    hot_comment_div.style.margin = "0 auto";
    hot_comment_div.style.borderRadius = "0px 0px 12px 12px";
    hot_comment_div.style.background = "white";
    hot_comment_div.style.width = "1200px";
    hot_comment_div.style.minHeight = "300px";
    hot_comment_div.style.position = "relative";
    hot_comment_div.style.top = "-210px";
    hot_comment_div.style.display = "flex";

    var all_comment_heading = document.createElement("h1");
    all_comment_heading.textContent = "全部評論";
    all_comment_heading.style.backgroundImage = "linear-gradient(to right, #e94250, #f33270, #f42d94, #e93abb, #d051e3)";
    all_comment_heading.style.borderRadius = "12px 12px 0px 0px";
    all_comment_heading.style.color = "white";
    all_comment_heading.style.width = "1200px";
    all_comment_heading.style.margin = "0 auto";
    all_comment_heading.style.position = "relative";
    all_comment_heading.style.top = "-190px";

    /*
    step 8
    append element from step1 to step7 to body
    */

    main_container.appendChild(top_div);
    main_container.appendChild(doctor_name_div);
    main_container.appendChild(comment_input_div);
    main_container.appendChild(hot_comment_heading);
    main_container.appendChild(hot_comment_div);
    main_container.appendChild(all_comment_heading);
    main_container.appendChild(comment_category_div);


    //append all div to body
    document.getElementById("veterans").appendChild(main_container);
    //document.getElementById("veterans").appendChild(doctor_name_div);
    //document.getElementById("veterans").appendChild(top_div);
    //document.getElementById("veterans").appendChild(patient_name_div);
    //document.getElementById("veterans").appendChild(patient_comment_div);
    //document.getElementById("veterans").appendChild(recommend_doctor_div);
    //document.getElementById("veterans").appendChild(send_div);
    //document.getElementById("veterans").appendChild(hot_comment_div);
    //document.getElementById("veterans").appendChild(comment_category_div);


    /*--------------------initialization end--------------------*/

    //API for dynamodb read and write
    var API_URL = "https://qgvvougt3j.execute-api.us-east-2.amazonaws.com/prod/entries";

    /*--------------------dynamodb read start--------------------*/

    /*
    step 9
    read data from dynamodb
    */

    //create read_comment_div
    var read_comment_div = document.createElement("div");
    read_comment_div.id = "read_comment";
    read_comment_div.innerHTML += "資料載入中...";
    read_comment_div.setAttribute("class", "card");
    read_comment_div.style.margin = "0 auto";
    read_comment_div.style.borderRadius = "0px 0px 12px 12px";
    read_comment_div.style.background = "white";
    read_comment_div.style.width = "1200px";
    read_comment_div.style.position = "relative";
    read_comment_div.style.top = "-190px";

    main_container.appendChild(read_comment_div);

    //create XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();

    //httpGet function (send request to dynamodb)
    function httpGet(theUrl, callback) {
        xmlhttp.open('GET', theUrl, true);
        xmlhttp.onload = function () {
            var data = JSON.parse(this.response);
            if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                console.log('success read comment');
            } else {
                console.log('error read comment');
            }
            callback(data);
        };
        xmlhttp.send();
    }

    //create delete_button and delete_button_textnode
    var delete_button = document.createElement("button");
    delete_button.type = "button";
    delete_button.style.position = "relative";
    delete_button.style.left = "10px";
    delete_button.style.marginBottom = "10px";
    var delete_button_textnode = document.createTextNode("刪除評論");
    delete_button.appendChild(delete_button_textnode);

    //create comment_cid_array (comment id that belongs to current page)
    var comment_cid_array = [];

    //create comment_nid_array (comment id that user_name is public)
    var comment_nid_array = [];

    //create comment_cid_rating_array
    var comment_cid_rating_array = [];

    //create comment_recommend_array
    var comment_recommend_array = [];

    //create comment count (count all comments)
    var comment_count = 0;

    //create actual_comment_count (count comments that belongs to current page)
    var actual_comment_count = 0;

    //create recommend_count and not_recomment_count
    var recommend_count = 0;
    var not_recommend_count = 0;
    //dynamodb_read function
    function dynamodb_read() {

        httpGet(API_URL, function (read) {

            console.log(read);
            comment_count = read.Count;
            //selection sort
            for (var i = 0; i < comment_count; i++) {
                var max = i;
                for (var j = i + 1; j < comment_count; j++) {
                    if (read.Items[j].cid > read.Items[max].cid) {
                        max = j;
                    }
                }
                var temp = read.Items[i];
                read.Items[i] = read.Items[max];
                read.Items[max] = temp;
            }

            document.getElementById("read_comment").innerHTML = "";

            for (i = 0; i < comment_count; i++) {
                if (read.Items[i].deleted == "y") {
                    continue;
                } else if (read.Items[i].tid != Number(doctor_id.tid)) {
                    continue;
                } else {
                    var read_comment_heading = document.createElement("h1");
                    //read_comment_heading.style.backgroundImage = "linear-gradient(to right, #9fe398, #ade590, #bbe789, #cae881, #dae97b)";
                    read_comment_heading.style.borderRadius = "12px 12px 0px 0px";
                    read_comment_heading.style.color = "white";
                    read_comment_heading.style.width = "1150px";

                    var read_comment = document.createElement("div");
                    read_comment.setAttribute("class", "card");
                    read_comment.style.margin = "0 auto";
                    read_comment.style.borderRadius = "0px 0px 12px 12px";
                    read_comment.style.background = "#F6F6F6";
                    read_comment.style.width = "1150px";

                    read_comment.appendChild(read_comment_heading);
                    actual_comment_count++;

                    //create recommend_text
                    var recommend_text = document.createElement("label");
                    if (read.Items[i].recommend == "y") {
                        read_comment_heading.textContent = "推薦";
                        read_comment_heading.style.backgroundColor = "green";
                        recommend_text.innerHTML = "推薦";
                        recommend_text.style.color = "green";
                        recommend_count++;
                        comment_recommend_array.push([read.Items[i].cid, "y"]);
                    } else if (read.Items[i].recommend == "n") {
                        read_comment_heading.textContent = "不推薦";
                        read_comment_heading.style.backgroundColor = "red";
                        recommend_text.innerHTML = "不推薦";
                        recommend_text.style.color = "red";
                        not_recommend_count++;
                        comment_recommend_array.push([read.Items[i].cid, "n"]);
                    }
                    //recommend_text.style.height = "1px";

                    //comment
                    //read_comment.appendChild(recommend_text);
                    //read_comment.innerHTML += "評論編號: " + read.Items[i].cid + "<br>";
                    var read_comment_no = document.createElement("p");
                    read_comment_no.textContent = "評論編號: " + read.Items[i].cid;
                    //read_comment.innerHTML += "評論時間: " + read.Items[i].date + "<br>";
                    var read_comment_time = document.createElement("p");
                    read_comment_time.textContent = "評論時間: " + read.Items[i].date;

                    read_comment.appendChild(read_comment_no);
                    read_comment.appendChild(read_comment_time);

                    var read_comment_name = document.createElement("p");
                    if (read.Items[i].name == "匿名") {
                        //read_comment.innerHTML += "評論者: " + read.Items[i].name + "<br>";
                        read_comment_name.textContent = "評論者: " + read.Items[i].name;
                        read_comment.appendChild(read_comment_name);
                    } else {
                        //read_comment.innerHTML += "評論者: ";
                        read_comment_name.textContent = "評論者: ";
                        read_comment.appendChild(read_comment_name);
                        var name = document.createElement("label");
                        name.id = "nid" + read.Items[i].cid;
                        name.style.position = "relative";
                        name.style.left = "10px";
                        name.innerText = read.Items[i].name;
                        comment_nid_array.push(read.Items[i].cid);
                        read_comment.appendChild(name);
                    }
                    //read_comment.innerHTML += "評論內容: " + read.Items[i].comment + "<br>";
                    var read_comment_illness = document.createElement("p");
                    read_comment_illness.textContent = "病症: " + read.Items[i].illness;
                    read_comment.appendChild(read_comment_illness);

                    var read_comment_content = document.createElement("p");
                    read_comment_content.textContent = "評論內容: " + read.Items[i].comment;
                    read_comment.appendChild(read_comment_content);

                    //comment good or bad textnode and button
                    var comment_good_button = document.createElement("button");
                    comment_good_button.type = "button";
                    comment_good_button.id = "gcb" + read.Items[i].cid;
                    comment_good_button.value = 0;
                    comment_good_button.style.position = "relative";
                    comment_good_button.style.left = "10px";
                    comment_good_button.style.marginBottom = "10px";
                    var comment_good_textnode = document.createTextNode("0 推");
                    comment_good_button.appendChild(comment_good_textnode);

                    var comment_bad_button = document.createElement("button");
                    comment_bad_button.type = "button";
                    comment_bad_button.id = "bcb" + read.Items[i].cid;
                    comment_bad_button.value = 0;
                    comment_bad_button.style.position = "relative";
                    comment_bad_button.style.left = "25px";
                    var comment_bad_textnode = document.createTextNode("0 噓");
                    comment_bad_button.appendChild(comment_bad_textnode);

                    if (user_id == "" && user_email == "") {
                        comment_good_button.disabled = true;
                        comment_bad_button.disabled = true;
                    }

                    read_comment.appendChild(comment_good_button);
                    read_comment.appendChild(comment_bad_button);
                    read_comment.innerHTML += "<br>";


                    //preparation for rating
                    comment_cid_rating_array.push(read.Items[i].cid);

                    //preparation for dynamodb delete
                    if (read.Items[i].uid == user_id) {
                        comment_cid_array.push(read.Items[i].cid);
                        delete_button.id = "db" + read.Items[i].cid;
                        read_comment.appendChild(delete_button);
                    }

                    document.getElementById("read_comment").appendChild(read_comment);
                    document.getElementById("read_comment").innerHTML += "<br>";
                }
            }
        });
    }

    //call dynamodb_read
    setTimeout(function () {
        dynamodb_read();
    }, 1000);

    /*--------------------dynamodb read end--------------------*/

    /*--------------------dynamodb write start--------------------*/

    /*
    step 10
    write data to dynamodb if send_button click
    */

    //send_button event
    send_button.onclick = function () {
        if (enter_comment_textarea.value == null || enter_comment_textarea.value == "") {
            alert("請輸入評論內容欄位!");
            return false;
        } else if (enter_illness_textarea.value == null || enter_illness_textarea.value == "") {
            alert("請輸入病症欄位!");
            return false;
        } else {
            if (confirm("是否送出評論?")) {
                //check input


                //get Dtae
                var date_now = new Date();
                var year = date_now.getFullYear();
                var month = date_now.getMonth() + 1; //January=0
                var day = date_now.getDate();
                var hour = date_now.getHours();
                var min = date_now.getMinutes();
                var sec = date_now.getSeconds();
                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hour < 10) {
                    hour = '0' + hour;
                }
                if (min < 10) {
                    min = '0' + min;
                }
                if (sec < 10) {
                    sec = '0' + sec;
                }
                date_now = year + '/' + month + '/' + day + " " + hour + ":" + min + ":" + sec;

                comment_count++;

                //handle multi-line
                enter_comment_textarea.value = enter_comment_textarea.value.replace(/\n/g, "<br>");
                enter_illness_textarea.value = enter_illness_textarea.value.replace(/\n/g, "<br>");

                xmlhttp = new XMLHttpRequest();

                var data = {
                    "cid": comment_count,
                    "tid": Number(doctor_id.tid),
                    "uid": user_id,
                    "email": user_email,
                    "date": date_now,
                    "name": patient_name,
                    "comment": enter_comment_textarea.value,
                    "recommend": recommend,
                    "deleted": "n",
                    "illness": enter_illness_textarea.value
                };
                data = JSON.stringify(data);

                //httpPost function (send request to dynamodb)
                function httpPost(theUrl) {
                    xmlhttp.open('POST', theUrl, true);
                    xmlhttp.setRequestHeader("content-type", "application/json");
                    xmlhttp.onload = function () {
                        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                            console.log('success write comment');
                        } else {
                            console.log('error write comment');
                        }
                    };
                    xmlhttp.send(data);
                }

                //call dynamodb_write function
                httpPost(API_URL);
                
                if (recommend == "y") {
                    if (pro_hide == "null") {
                        pro_hide = enter_illness_textarea.value;
                    } else {
                        pro_hide += ", " + enter_illness_textarea.value;
                    }
                }

                var data_doctor = {
                    "tid": String(doctor_id.tid),
                    "rating": String(recommend_percentage),
                    "pro": pro,
                    "pro_hide": pro_hide,
                    "name": name
                };
                data_doctor = JSON.stringify(data_doctor);

                //httpPost_doctor function(send data to cgudoctor table)
                var xmlhttp_doctor = new XMLHttpRequest();

                function httpPost_doctor(theUrl) {
                    xmlhttp_doctor.open('POST', theUrl, true);
                    xmlhttp_doctor.setRequestHeader("content-type", "application/json");
                    xmlhttp_doctor.onload = function () {
                        if (xmlhttp_doctor.status >= 200 && xmlhttp_doctor.status < 400) {
                            console.log('success write doctor');
                        } else {
                            console.log('error write doctor');
                        }
                    };
                    xmlhttp_doctor.send(data_doctor);
                }

                httpPost_doctor(API_URL_DOCTOR);

                //reset input
                enter_comment_textarea.value = "";
                enter_illness_textarea.value = "";

                //reload page
                alert("評論已送出");

                setTimeout(function () {
                    location.reload();
                }, 2000);

            } else {
                //Do nothing.
            }
        }

    };
    /*--------------------dynamodb write end--------------------*/

    //API for dynamodb delete
    var API_URL_DELETE = "https://xlbilu7vmi.execute-api.us-east-2.amazonaws.com/prod/entries";

    /*--------------------dynamodb delete start--------------------*/

    /*
    step 11
    delete data from dynamodb if delete_button click
    */

    //wait 2.5 sec before data load
    function set_dynamodb_delete() {
        console.log("set delete comment");
        //for loop for all delete_button set
        for (var i = 0; i < comment_cid_array.length; i++) {
            var x = "db" + comment_cid_array[i];

            //delete_button event
            document.getElementById(x).onclick = function (e) {
                if (confirm("是否刪除評論?")) {
                    //console.log(e.srcElement.id + " button clicked");
                    var xmlhttp = new XMLHttpRequest();

                    var data = {
                        "cid": Number(e.srcElement.id.slice(2))
                    };
                    data = JSON.stringify(data);

                    //httpPost_delete function (send request to dynamodb)
                    function httpPost_delete(theUrl) {
                        xmlhttp.open('POST', theUrl, true);
                        xmlhttp.setRequestHeader("content-type", "application/json");
                        xmlhttp.onload = function () {
                            if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                                console.log('success delete comment');
                            } else {
                                console.log('error delete comment');
                            }
                        };
                        xmlhttp.send(data);
                    }

                    //call httpPost_delete function
                    httpPost_delete(API_URL_DELETE);

                    //reload page
                    alert("評論已刪除!");
                    setTimeout(function () {
                        location.reload();
                    }, 2000);

                } else {
                    //Do nothing
                }
            };
        }
    }

    //call set_dynamodb_detele function
    setTimeout(function () {
        set_dynamodb_delete();
    }, 2500);

    /*--------------------dynamodb delete end--------------------*/

    /*--------------------comment category start--------------------*/

    /*
    step 12
    show selected comment if checkbox click
    */

    for (var i = 1; i <= 4; i++) {
        document.getElementById("cb" + i).onclick = function () {
            comment_cid_array = [];
            comment_nid_array = [];
            comment_cid_rating_array = [];
            read_comment_div.innerHTML = "資料載入中...";
            xmlhttp = new XMLHttpRequest();

            httpGet(API_URL, function (read) {
                comment_count = read.Count;
                //selection sort
                for (var i = 0; i < comment_count; i++) {
                    var max = i;
                    for (var j = i + 1; j < comment_count; j++) {
                        if (read.Items[j].cid > read.Items[max].cid) {
                            max = j;
                        }
                    }
                    var temp = read.Items[i];
                    read.Items[i] = read.Items[max];
                    read.Items[max] = temp;
                }

                document.getElementById("read_comment").innerHTML = "";

                for (i = 0; i < comment_count; i++) {
                    if (read.Items[i].deleted == "y") {
                        continue;
                    } else if (read.Items[i].tid != Number(doctor_id.tid)) {
                        continue;
                    } else if (document.getElementById("cb1").checked == false && read.Items[i].recommend == "y") {
                        continue;
                    } else if (document.getElementById("cb2").checked == false && read.Items[i].recommend == "n") {
                        continue;
                    } else if (document.getElementById("cb3").checked == false && read.Items[i].name == "匿名") {
                        continue;
                    } else if (document.getElementById("cb4").checked == false && read.Items[i].name != "匿名") {
                        continue;
                    } else {
                        var read_comment_heading = document.createElement("h1");
                        //read_comment_heading.style.backgroundImage = "linear-gradient(to right, #9fe398, #ade590, #bbe789, #cae881, #dae97b)";
                        read_comment_heading.style.borderRadius = "12px 12px 0px 0px";
                        read_comment_heading.style.color = "white";
                        read_comment_heading.style.width = "1150px";

                        var read_comment = document.createElement("div");
                        read_comment.setAttribute("class", "card");
                        read_comment.style.margin = "0 auto";
                        read_comment.style.borderRadius = "0px 0px 12px 12px";
                        read_comment.style.background = "#F6F6F6";
                        read_comment.style.width = "1150px";

                        read_comment.appendChild(read_comment_heading);
                        //create recommend_text
                        var recommend_text = document.createElement("label");
                        if (read.Items[i].recommend == "y") {
                            read_comment_heading.textContent = "推薦";
                            read_comment_heading.style.backgroundColor = "green";
                            recommend_text.innerHTML = "推薦";
                            recommend_text.style.color = "green";
                            recommend_count++;
                        } else if (read.Items[i].recommend == "n") {
                            read_comment_heading.textContent = "不推薦";
                            read_comment_heading.style.backgroundColor = "red";
                            recommend_text.innerHTML = "不推薦";
                            recommend_text.style.color = "red";
                            not_recommend_count++;
                        }
                        //recommend_text.style.height = "1px";

                        //comment
                        //read_comment.appendChild(recommend_text);
                        var read_comment_no = document.createElement("p");
                        read_comment_no.textContent = "評論編號: " + read.Items[i].cid;
                        var read_comment_time = document.createElement("p");
                        read_comment_time.textContent = "評論時間: " + read.Items[i].date;

                        read_comment.appendChild(read_comment_no);
                        read_comment.appendChild(read_comment_time);

                        var read_comment_name = document.createElement("p");
                        if (read.Items[i].name == "匿名") {
                            read_comment_name.textContent = "評論者: " + read.Items[i].name;
                            read_comment.appendChild(read_comment_name);
                        } else {
                            read_comment_name.textContent = "評論者: ";
                            read_comment.appendChild(read_comment_name);
                            var name = document.createElement("label");
                            name.id = "nid" + read.Items[i].cid;
                            name.style.position = "relative";
                            name.style.left = "10px";
                            name.innerText = read.Items[i].name;
                            comment_nid_array.push(read.Items[i].cid);
                            read_comment.appendChild(name);
                        }
                        var read_comment_illness = document.createElement("p");
                        read_comment_illness.textContent = "病症: " + read.Items[i].illness;
                        read_comment.appendChild(read_comment_illness);
                        var read_comment_content = document.createElement("p");
                        read_comment_content.textContent = "評論內容: " + read.Items[i].comment;
                        read_comment.appendChild(read_comment_content);

                        //comment good or bad textnode and button
                        var comment_good_button = document.createElement("button");
                        comment_good_button.type = "button";
                        comment_good_button.id = "gcb" + read.Items[i].cid;
                        comment_good_button.value = 0;
                        comment_good_button.style.position = "relative";
                        comment_good_button.style.left = "10px";
                        comment_good_button.style.marginBottom = "10px";
                        var comment_good_textnode = document.createTextNode("0 推");
                        comment_good_button.appendChild(comment_good_textnode);

                        var comment_bad_button = document.createElement("button");
                        comment_bad_button.type = "button";
                        comment_bad_button.id = "bcb" + read.Items[i].cid;
                        comment_bad_button.value = 0;
                        comment_bad_button.style.position = "relative";
                        comment_bad_button.style.left = "25px";
                        var comment_bad_textnode = document.createTextNode("0 噓");
                        comment_bad_button.appendChild(comment_bad_textnode);

                        if (user_id == "" && user_email == "") {
                            comment_good_button.disabled = true;
                            comment_bad_button.disabled = true;
                        }

                        read_comment.appendChild(comment_good_button);
                        read_comment.appendChild(comment_bad_button);
                        read_comment.innerHTML += "<br>";


                        //preparation for rating
                        comment_cid_rating_array.push(read.Items[i].cid);

                        //preparation for dynamodb delete
                        if (read.Items[i].uid == user_id) {
                            comment_cid_array.push(read.Items[i].cid);
                            delete_button.id = "db" + read.Items[i].cid;
                            read_comment.appendChild(delete_button);
                        }
                        document.getElementById("read_comment").appendChild(read_comment);
                        document.getElementById("read_comment").innerHTML += "<br>";

                    }
                }
            });

            setTimeout(function () {
                set_specific_comment();
            }, 1500);

            setTimeout(function () {
                set_dynamodb_delete();
                read_rating();
                set_comment_good_button();
                set_comment_bad_button();
            }, 2500);
        };
    }
    /*--------------------comment category end--------------------*/

    /*--------------------specific comment start--------------------*/

    /*
    step 13
    show specific comment if email click
    */

    function set_specific_comment() {
        console.log("set specific comment");
        for (i = 0; i < comment_nid_array.length; i++) {
            document.getElementById("nid" + comment_nid_array[i]).onclick = function (e) {
                var nid = e.srcElement.innerText;
                read_comment_div.innerHTML = "資料載入中...";
                comment_cid_array = [];
                comment_cid_rating_array = [];
                xmlhttp = new XMLHttpRequest();

                httpGet(API_URL, function (read) {
                    comment_count = read.Count;
                    //selection sort
                    for (var i = 0; i < comment_count; i++) {
                        var max = i;
                        for (var j = i + 1; j < comment_count; j++) {
                            if (read.Items[j].cid > read.Items[max].cid) {
                                max = j;
                            }
                        }
                        var temp = read.Items[i];
                        read.Items[i] = read.Items[max];
                        read.Items[max] = temp;
                    }

                    document.getElementById("read_comment").innerHTML = "";

                    for (i = 0; i < comment_count; i++) {
                        if (read.Items[i].deleted == "y") {
                            continue;
                        } else if (read.Items[i].tid != Number(doctor_id.tid)) {
                            continue;
                        } else if (nid != read.Items[i].name) {
                            continue;
                        } else {
                            var read_comment_heading = document.createElement("h1");
                            //read_comment_heading.style.backgroundImage = "linear-gradient(to right, #9fe398, #ade590, #bbe789, #cae881, #dae97b)";
                            read_comment_heading.style.borderRadius = "12px 12px 0px 0px";
                            read_comment_heading.style.color = "white";
                            read_comment_heading.style.width = "1150px";

                            var read_comment = document.createElement("div");
                            read_comment.setAttribute("class", "card");
                            read_comment.style.margin = "0 auto";
                            read_comment.style.borderRadius = "0px 0px 12px 12px";
                            read_comment.style.background = "#F6F6F6";
                            read_comment.style.width = "1150px";

                            read_comment.appendChild(read_comment_heading);

                            //create recommend_text
                            var recommend_text = document.createElement("label");
                            if (read.Items[i].recommend == "y") {
                                read_comment_heading.textContent = "推薦";
                                read_comment_heading.style.backgroundColor = "green";
                                recommend_text.innerHTML = "推薦";
                                recommend_text.style.color = "green";
                                recommend_count++;
                            } else if (read.Items[i].recommend == "n") {
                                read_comment_heading.textContent = "不推薦";
                                read_comment_heading.style.backgroundColor = "red";
                                recommend_text.innerHTML = "不推薦";
                                recommend_text.style.color = "red";
                                not_recommend_count++;
                            }
                            //recommend_text.style.height = "1px";

                            //comment
                            //read_comment.appendChild(recommend_text);
                            var read_comment_no = document.createElement("p");
                            read_comment_no.textContent = "評論編號: " + read.Items[i].cid;
                            var read_comment_time = document.createElement("p");
                            read_comment_time.textContent = "評論時間: " + read.Items[i].date;
                            var read_comment_name = document.createElement("p");
                            read_comment_name.textContent = "評論者: " + read.Items[i].name;
                            var read_comment_illness = document.createElement("p");
                            read_comment_illness.textContent = "病症: " + read.Items[i].illness;
                            var read_comment_content = document.createElement("p");
                            read_comment_content.textContent = "評論內容: " + read.Items[i].comment;

                            read_comment.appendChild(read_comment_no);
                            read_comment.appendChild(read_comment_time);
                            read_comment.appendChild(read_comment_illness);
                            read_comment.appendChild(read_comment_name);
                            read_comment.appendChild(read_comment_content);

                            //comment good or bad textnode and button
                            var comment_good_button = document.createElement("button");
                            comment_good_button.type = "button";
                            comment_good_button.id = "gcb" + read.Items[i].cid;
                            comment_good_button.value = 0;
                            comment_good_button.style.position = "relative";
                            comment_good_button.style.left = "10px";
                            comment_good_button.style.marginBottom = "10px";
                            var comment_good_textnode = document.createTextNode("0 推");
                            comment_good_button.appendChild(comment_good_textnode);

                            var comment_bad_button = document.createElement("button");
                            comment_bad_button.type = "button";
                            comment_bad_button.id = "bcb" + read.Items[i].cid;
                            comment_bad_button.value = 0;
                            comment_bad_button.style.position = "relative";
                            comment_bad_button.style.left = "25px";
                            var comment_bad_textnode = document.createTextNode("0 噓");
                            comment_bad_button.appendChild(comment_bad_textnode);

                            if (user_id == "" && user_email == "") {
                                comment_good_button.disabled = true;
                                comment_bad_button.disabled = true;
                            }

                            read_comment.appendChild(comment_good_button);
                            read_comment.appendChild(comment_bad_button);
                            read_comment.innerHTML += "<br>";


                            //preparation for rating
                            comment_cid_rating_array.push(read.Items[i].cid);

                            //preparation for dynamodb delete
                            if (read.Items[i].uid == user_id) {
                                comment_cid_array.push(read.Items[i].cid);
                                delete_button.id = "db" + read.Items[i].cid;
                                read_comment.appendChild(delete_button);
                            }

                            document.getElementById("read_comment").appendChild(read_comment);
                            document.getElementById("read_comment").innerHTML += "<br>";
                        }
                    }
                });

                //disable commend_category_checkbox
                comment_category_recommend_checkbox.disabled = true;
                comment_category_not_recommend_checkbox.disabled = true;
                comment_category_anonymous_checkbox.disabled = true;
                comment_category_public_checkbox.disabled = true;

                //create comment_category_reset_button
                var comment_category_reset_button = document.createElement("button");
                comment_category_reset_button.type = "button";
                comment_category_reset_button.style.height = "25px";
                comment_category_reset_button.style.position = "relative";
                comment_category_reset_button.style.left = "10px";
                var comment_category_reset_textnode = document.createTextNode("重設");
                comment_category_reset_button.appendChild(comment_category_reset_textnode);

                comment_category_div.appendChild(comment_category_reset_button);

                //comment_category_reset_button event
                comment_category_reset_button.onclick = function () {
                    location.reload();
                };

                setTimeout(function () {
                    set_dynamodb_delete();
                    read_rating();
                    set_comment_good_button();
                    set_comment_bad_button();
                }, 2500);
            };
        }
    }

    setTimeout(function () {
        set_specific_comment();
    }, 2500);

    /*--------------------specific comment end--------------------*/

    /*--------------------comment good_bad read start--------------------*/

    //API for rating
    var API_URL_RATING = "https://cpkjznr6w3.execute-api.us-east-2.amazonaws.com/prod/rating";

    //create var rating_count
    var rating_count = 0;

    function httpGet_rating(theUrl, callback) {
        xmlhttp.open('GET', theUrl, true);
        xmlhttp.onload = function () {
            var data = JSON.parse(this.response);
            if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                console.log('success read rating');
            } else {
                console.log('error read rating');
            }
            callback(data);
        };
        xmlhttp.send();
    }

    function read_rating() {
        xmlhttp = new XMLHttpRequest();

        httpGet_rating(API_URL_RATING, function (read) {
            console.log(read);
            rating_count = read.Count;
            for (var i = 0; i < rating_count; i++) {
                if (read.Items[i].rating == "good") {
                    for (var j = 0; j < comment_cid_rating_array.length; j++) {
                        if (comment_cid_rating_array[j] == read.Items[i].cid) {
                            var good_button = document.getElementById("gcb" + read.Items[i].cid);
                            var good_count = good_button.value;
                            good_count++;
                            good_button.textContent = good_count + " 推";
                            good_button.value = good_count;
                        }
                    }
                } else if (read.Items[i].rating == "bad") {
                    for (var j = 0; j < comment_cid_rating_array.length; j++) {
                        if (comment_cid_rating_array[j] == read.Items[i].cid) {
                            var bad_button = document.getElementById("bcb" + read.Items[i].cid);
                            var bad_count = bad_button.value;
                            bad_count++;
                            bad_button.textContent = bad_count + " 噓";
                            bad_button.value = bad_count;
                        }
                    }
                }
            }
        });
    }

    setTimeout(function () {
        read_rating();
    }, 2500);

    /*--------------------comment good_bad read end--------------------*/

    /*--------------------comment good write start--------------------*/

    function set_comment_good_button() {
        for (i = 0; i < comment_cid_rating_array.length; i++) {
            var x = "gcb" + comment_cid_rating_array[i];
            document.getElementById(x).onclick = function (e) {
                var good_button_id = e.srcElement.id.slice(3);
                var reviewed = 0;
                xmlhttp = new XMLHttpRequest();
                httpGet_rating(API_URL_RATING, function (read) {
                    for (var i = 0; i < read.Count; i++) {
                        if (read.Items[i].cid == good_button_id && read.Items[i].uid == user_id) {
                            alert("已經推或噓過此評論");
                            reviewed = 1;
                            break;
                        }
                    }
                    if (reviewed == 0) {
                        if (confirm("送出推之後就無法修改，確認送出?")) {
                            xmlhttp = new XMLHttpRequest();
                            rating_count++;
                            var data = {
                                "cid": good_button_id,
                                "rid": rating_count,
                                "uid": user_id,
                                "rating": "good"
                            };
                            data = JSON.stringify(data);

                            function httpPost_rating(theUrl) {
                                xmlhttp.open('POST', theUrl, true);
                                xmlhttp.setRequestHeader("content-type", "application/json");
                                xmlhttp.onload = function () {
                                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                                        console.log('success good');
                                    } else {
                                        console.log('error good');
                                    }
                                };
                                xmlhttp.send(data);
                            }
                            httpPost_rating(API_URL_RATING);

                            var count = document.getElementById(e.srcElement.id).value;
                            count++;
                            document.getElementById(e.srcElement.id).textContent = count + " 推";
                            alert("推已送出");
                        } else {
                            //Do nothing
                        }
                    }
                });
            };
        }
    }

    setTimeout(function () {
        set_comment_good_button();
    }, 2500);

    /*--------------------comment good write end--------------------*/

    /*--------------------comment bad write start--------------------*/

    function set_comment_bad_button() {
        for (i = 0; i < comment_cid_rating_array.length; i++) {
            var x = "bcb" + comment_cid_rating_array[i];
            document.getElementById(x).onclick = function (e) {
                var good_button_id = e.srcElement.id.slice(3);
                var reviewed = 0;
                xmlhttp = new XMLHttpRequest();
                httpGet_rating(API_URL_RATING, function (read) {
                    for (var i = 0; i < read.Count; i++) {
                        if (read.Items[i].cid == good_button_id && read.Items[i].uid == user_id) {
                            alert("已經推或噓過此評論");
                            reviewed = 1;
                            break;
                        }
                    }
                    if (reviewed == 0) {
                        if (confirm("送出噓之後就無法修改，確認送出?")) {
                            xmlhttp = new XMLHttpRequest();
                            rating_count++;
                            var data = {
                                "cid": good_button_id,
                                "rid": rating_count,
                                "uid": user_id,
                                "rating": "bad"
                            };
                            data = JSON.stringify(data);

                            function httpPost_rating(theUrl) {
                                xmlhttp.open('POST', theUrl, true);
                                xmlhttp.setRequestHeader("content-type", "application/json");
                                xmlhttp.onload = function () {
                                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                                        console.log('success bad');
                                    } else {
                                        console.log('error bad');
                                    }
                                };
                                xmlhttp.send(data);
                            }
                            httpPost_rating(API_URL_RATING);

                            var count = document.getElementById(e.srcElement.id).value;
                            count++;
                            document.getElementById(e.srcElement.id).textContent = count + " 噓";
                            alert("噓已送出");
                        } else {
                            //Do nothing
                        }
                    }
                });
            };
        }
    }

    setTimeout(function () {
        set_comment_bad_button();
    }, 2500);

    /*--------------------comment bad write end--------------------*/

    /*--------------------hot comment start--------------------*/

    //create comment_good_rating_array

    var comment_good_rating_array = [];
    var comment_bad_rating_array = [];
    var hot_comment_array = [
        [0, 0]
    ];

    setTimeout(function () {
        for (var i = 0; i < comment_cid_rating_array.length; i++) {
            var x = "gcb" + comment_cid_rating_array[i];
            comment_good_rating_array.push([comment_cid_rating_array[i], Number(document.getElementById(x).value)]);
            x = "bcb" + comment_cid_rating_array[i];
            comment_bad_rating_array.push([comment_cid_rating_array[i], Number(document.getElementById(x).value)]);
        }

        for (i = 0; i < comment_cid_rating_array.length; i++) {
            if (comment_good_rating_array[i][1] > comment_bad_rating_array[i][1]) {
                var x = comment_good_rating_array[i][1] + comment_bad_rating_array[i][1];
                if (hot_comment_array.length < 3) {
                    hot_comment_array.push([comment_cid_rating_array[i], x]);
                } else {
                    if (x > hot_comment_array[2][1]) {
                        hot_comment_array.pop();
                        hot_comment_array.push([comment_cid_rating_array[i], x]);
                    }
                }
                for (var j = 0; j < hot_comment_array.length; j++) {
                    var max = j;
                    for (var k = j + 1; k < hot_comment_array.length; k++) {
                        if (hot_comment_array[k][1] > hot_comment_array[max][1]) {
                            max = k;
                        }
                    }
                    var temp = hot_comment_array[j];
                    hot_comment_array[j] = hot_comment_array[max];
                    hot_comment_array[max] = temp;
                }
            }
        }
        console.log(hot_comment_array);

        var hot_comment_div = document.getElementById("hot_comment_div");

        function hot_comment_read() {
            httpGet(API_URL, function (read) {
                hot_comment_div.innerHTML = "";
                //hot_comment_div.appendChild(hot_comment_heading);
                for (var i = 0; i < hot_comment_array.length; i++) {
                    var hot_comment = document.createElement("div");
                    hot_comment.setAttribute("class", "card");
                    hot_comment.style.margin = "1rem";
                    hot_comment.style.width = "368px";
                    hot_comment.style.minHeight = "300px";
                    hot_comment.style.backgroundColor = "#F6F6F6";
                    hot_comment.style.borderRadius = "12px";
                    if (hot_comment_array[i][1] > 0) {
                        for (var j = 0; j < read.Count; j++) {
                            if (hot_comment_array[i][0] == read.Items[j].cid) {
                                var hot_comment_ranking = document.createElement("h3");
                                hot_comment_ranking.style.borderRadius = "12px 12px 0px 0px";
                                if (i == 0) {
                                    hot_comment_ranking.style.backgroundColor = "#CFB53B";
                                    hot_comment_ranking.textContent = " No. 1";
                                    hot_comment.appendChild(hot_comment_ranking);
                                } else if (i == 1) {
                                    hot_comment_ranking.style.backgroundColor = "#E6E8FA";
                                    hot_comment_ranking.textContent = " No. 2";
                                    hot_comment.appendChild(hot_comment_ranking);
                                } else if (i == 2) {
                                    hot_comment_ranking.style.backgroundColor = "#8C7853";
                                    hot_comment_ranking.style.color = "white";
                                    hot_comment_ranking.textContent = " No. 3";
                                    hot_comment.appendChild(hot_comment_ranking);
                                }

                                //create recommend_text
                                var recommend_text = document.createElement("label");
                                recommend_text.style.fontSize = "16px";
                                recommend_text.style.position = "relative";
                                recommend_text.style.left = "10px";
                                if (read.Items[j].recommend == "y") {
                                    recommend_text.innerHTML = "推薦";
                                    recommend_text.style.color = "green";
                                } else if (read.Items[j].recommend == "n") {
                                    recommend_text.innerHTML = "不推薦";
                                    recommend_text.style.color = "red";
                                }

                                //comment
                                var hot_comment_no = document.createElement("p");
                                hot_comment_no.textContent = "評論編號: " + read.Items[j].cid;
                                var hot_comment_time = document.createElement("p");
                                hot_comment_time.textContent = "評論時間: " + read.Items[j].date;
                                var hot_comment_name = document.createElement("p");
                                hot_comment_name.textContent = "評論者: " + read.Items[j].name;
                                var hot_comment_illness = document.createElement("p");
                                hot_comment_illness.textContent = "病症: " + read.Items[j].illness;
                                var hot_comment_content = document.createElement("p");
                                hot_comment_content.textContent = "評論內容: " + read.Items[j].comment;
                                hot_comment.appendChild(recommend_text);
                                hot_comment.appendChild(hot_comment_no);
                                hot_comment.appendChild(hot_comment_time);
                                hot_comment.appendChild(hot_comment_illness);
                                hot_comment.appendChild(hot_comment_name);
                                hot_comment.appendChild(hot_comment_content);

                                /*
                                hot_comment.innerHTML += "評論編號: " + read.Items[j].cid + "<br>";
                                hot_comment.innerHTML += "評論時間: " + read.Items[j].date + "<br>";
                                hot_comment.innerHTML += "評論者: " + read.Items[j].name + "<br>";
                                hot_comment.innerHTML += "評論內容: " + read.Items[j].comment + "<br>";
                                */

                                //comment good or bad textnode and button
                                var comment_good_button = document.createElement("button");
                                comment_good_button.type = "button";
                                comment_good_button.id = "ghcb" + read.Items[j].cid;
                                comment_good_button.style.position = "relative";
                                comment_good_button.style.left = "10px";
                                var comment_bad_button = document.createElement("button");
                                comment_bad_button.type = "button";
                                comment_bad_button.id = "bhcb" + read.Items[j].cid;
                                comment_bad_button.style.position = "relative";
                                comment_bad_button.style.left = "25px";
                                for (var k = 0; k < comment_cid_rating_array.length; k++) {
                                    if (comment_good_rating_array[k][0] == read.Items[j].cid) {
                                        comment_good_button.value = comment_good_rating_array[k][1];
                                        var comment_good_textnode = document.createTextNode(comment_good_rating_array[k][1] + " 推");
                                        comment_good_button.appendChild(comment_good_textnode);

                                        comment_bad_button.value = comment_bad_rating_array[k][1];
                                        var comment_bad_textnode = document.createTextNode(comment_bad_rating_array[k][1] + " 噓");
                                        comment_bad_button.appendChild(comment_bad_textnode);
                                    }
                                }

                                if (user_id == "" && user_email == "") {
                                    comment_good_button.disabled = true;
                                    comment_bad_button.disabled = true;
                                }

                                hot_comment.appendChild(comment_good_button);
                                hot_comment.appendChild(comment_bad_button);
                                hot_comment.innerHTML += "<br>";
                            }
                        }
                    }
                    if (hot_comment.innerHTML == "") {
                        hot_comment.innerHTML += "目前尚無更多熱門評論...";
                    }
                    hot_comment_div.appendChild(hot_comment);
                }
            });
        }

        hot_comment_read();

    }, 4500);

    function set_hot_comment_good_button() {
        for (i = 0; i < hot_comment_array.length; i++) {
            var x = "ghcb" + hot_comment_array[i][0];
            document.getElementById(x).onclick = function (e) {
                var good_button_id = e.srcElement.id.slice(4);
                var reviewed = 0;
                xmlhttp = new XMLHttpRequest();
                httpGet_rating(API_URL_RATING, function (read) {
                    for (var i = 0; i < read.Count; i++) {
                        if (read.Items[i].cid == good_button_id && read.Items[i].uid == user_id) {
                            alert("已經推或噓過此評論");
                            reviewed = 1;
                            break;
                        }
                    }
                    if (reviewed == 0) {
                        if (confirm("送出推之後就無法修改，確認送出?")) {
                            xmlhttp = new XMLHttpRequest();
                            rating_count++;
                            var data = {
                                "cid": good_button_id,
                                "rid": rating_count,
                                "uid": user_id,
                                "rating": "good"
                            };
                            data = JSON.stringify(data);

                            function httpPost_rating(theUrl) {
                                xmlhttp.open('POST', theUrl, true);
                                xmlhttp.setRequestHeader("content-type", "application/json");
                                xmlhttp.onload = function () {
                                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                                        console.log('success good');
                                    } else {
                                        console.log('error good');
                                    }
                                };
                                xmlhttp.send(data);
                            }
                            httpPost_rating(API_URL_RATING);

                            var count = document.getElementById(e.srcElement.id).value;
                            count++;
                            document.getElementById(e.srcElement.id).textContent = count + " 推";
                            alert("推已送出");
                        } else {
                            //Do nothing
                        }
                    }
                });
            };
        }
    }

    function set_hot_comment_bad_button() {
        for (i = 0; i < hot_comment_array.length; i++) {
            var x = "bhcb" + hot_comment_array[i][0];
            document.getElementById(x).onclick = function (e) {
                var good_button_id = e.srcElement.id.slice(4);
                var reviewed = 0;
                xmlhttp = new XMLHttpRequest();
                httpGet_rating(API_URL_RATING, function (read) {
                    for (var i = 0; i < read.Count; i++) {
                        if (read.Items[i].cid == good_button_id && read.Items[i].uid == user_id) {
                            alert("已經推或噓過此評論");
                            reviewed = 1;
                            break;
                        }
                    }
                    if (reviewed == 0) {
                        if (confirm("送出噓之後就無法修改，確認送出?")) {
                            xmlhttp = new XMLHttpRequest();
                            rating_count++;
                            var data = {
                                "cid": good_button_id,
                                "rid": rating_count,
                                "uid": user_id,
                                "rating": "bad"
                            };
                            data = JSON.stringify(data);

                            function httpPost_rating(theUrl) {
                                xmlhttp.open('POST', theUrl, true);
                                xmlhttp.setRequestHeader("content-type", "application/json");
                                xmlhttp.onload = function () {
                                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                                        console.log('success bad');
                                    } else {
                                        console.log('error bad');
                                    }
                                };
                                xmlhttp.send(data);
                            }
                            httpPost_rating(API_URL_RATING);

                            var count = document.getElementById(e.srcElement.id).value;
                            count++;
                            document.getElementById(e.srcElement.id).textContent = count + " 噓";
                            alert("噓已送出");
                        } else {
                            //Do nothing
                        }
                    }
                });
            };
        }
    }

    setTimeout(function () {
        set_hot_comment_good_button();
        set_hot_comment_bad_button();
    }, 6500);

    /*--------------------hot comment end--------------------*/

    /*--------------------docrot recommend% start--------------------*/

    var recommend_with_more_good = 0;
    var recommend_with_more_bad = 0;
    var not_recommend_with_more_good = 0;
    var not_recommend_with_more_bad = 0;
    var recommend_percentage = 0;

    setTimeout(function () {
        for (var i = 0; i < comment_recommend_array.length; i++) {
            if (comment_recommend_array[i][1] == "y") {
                for (var j = 0; j < comment_good_rating_array.length; j++) {
                    if (comment_good_rating_array[j][0] == comment_recommend_array[i][0]) {
                        if (comment_good_rating_array[j][1] >= comment_bad_rating_array[j][1]) {
                            recommend_with_more_good++;
                        } else {
                            recommend_with_more_bad++;
                        }
                    }
                }
            } else if (comment_recommend_array[i][1] == "n") {
                for (var k = 0; k < comment_good_rating_array.length; k++) {
                    if (comment_good_rating_array[k][0] == comment_recommend_array[i][0]) {
                        if (comment_good_rating_array[k][1] >= comment_bad_rating_array[k][1]) {
                            not_recommend_with_more_good++;
                        } else {
                            not_recommend_with_more_bad++;
                        }
                    }
                }
            }
        }
        //append recommend_count and not_recommend_count to doctor_name_div 
        var x = recommend_with_more_good * 1 + recommend_with_more_bad * 0.5;
        var y = not_recommend_with_more_good * 1 + not_recommend_with_more_bad * 0.5;
        recommend_percentage = Math.round(x / (x + y) * 100);

        var doctor_name_div = document.getElementById("doctor_name_div");
        var doctor_recommend_count = document.createElement("p");
        doctor_recommend_count.textContent = "推薦評論數: " + recommend_count + " 筆";
        doctor_recommend_count.style.fontSize = "20px";
        var doctor_not_recommend_count = document.createElement("p");
        doctor_not_recommend_count.textContent = "不推薦評論數: " + not_recommend_count + " 筆";
        doctor_not_recommend_count.style.fontSize = "20px";
        var doctor_recommend_percentage = document.createElement("p");
        doctor_recommend_percentage.textContent = "推薦度： " + recommend_percentage + "%";
        doctor_recommend_percentage.style.fontSize = "20px";
        var doctor_no_comment = document.createElement("p");
        doctor_no_comment.textContent = "尚無評論，快來新增吧!";
        if (actual_comment_count > 0) {
            doctor_name_div.innerHTML = "";
            doctor_name_div.appendChild(doctor_name);
            doctor_name_div.appendChild(doctor_recommend_count);
            doctor_name_div.appendChild(doctor_not_recommend_count);
            doctor_name_div.appendChild(doctor_recommend_percentage);
        } else {
            doctor_name_div.innerHTML = "";
            doctor_name_div.appendChild(doctor_name);
            doctor_name_div.appendChild(doctor_no_comment);
            comment_category_div.style.display = "none";
        }
        /*
        if (actual_comment_count > 0) {
            doctor_name_div.innerHTML = "";
            doctor_name_div.innerHTML += doctor_name;
            doctor_name_div.innerHTML += "<br>推薦數: " + recommend_count;
            doctor_name_div.innerHTML += "<br>不推薦數: " + not_recommend_count;
            doctor_name_div.innerHTML += "<br>推薦度: " + recommend_percentage + "%";
            //doctor_name_div.innerHTML += "<br>推薦度: " + Math.round((recommend_count / (recommend_count + not_recommend_count)) * 100) + "%<hr>";
        } else {
            doctor_name_div.innerHTML = "";
            doctor_name_div.innerHTML += doctor_name;
            doctor_name_div.innerHTML += "<br>尚無評論，快來新增吧!<hr>";
            comment_category_div.style.display = "none";
        }
        */
    }, 5000);

    /*--------------------doctor recommend% end--------------------*/

    /*--------------------dynamodb doctor recommend% start--------------------*/
    var API_URL_DOCTOR = "https://ie423ja9xf.execute-api.us-east-2.amazonaws.com/prod/doctor";
    var pro;
    var pro_hide;
    var name;
    var percentage;

    function dynamodb_doctor_post() {

        function httpGet_doctor(theUrl, callback) {
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
        httpGet_doctor(API_URL_DOCTOR, function (read) {
            var i;
            for (i = 0; i < read.Count; i++) {
                if (read.Items[i].tid == doctor_id.tid) {
                    name = read.Items[i].name;
                    pro = read.Items[i].pro;
                    if (read.Items[i].pro_hide == undefined) {
                        pro_hide = "null";
                    } else {
                        pro_hide = read.Items[i].pro_hide;
                    }

                }
            }
        });

        if (isNaN(recommend_percentage)) {
            percentage = "";
        } else {
            percentage = String(recommend_percentage);
        }

        setTimeout(function () {
            var data = {
                "tid": String(doctor_id.tid),
                "rating": percentage,
                "pro": pro,
                "pro_hide": pro_hide,
                "name": name
            };
            data = JSON.stringify(data);

            function httpPost_doctor(theUrl) {
                xmlhttp.open('POST', theUrl, true);
                xmlhttp.setRequestHeader("content-type", "application/json");
                xmlhttp.onload = function () {
                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                        console.log('success post doctor');
                    } else {
                        console.log('error post doctor');
                    }
                };
                xmlhttp.send(data);
            }
            httpPost_doctor(API_URL_DOCTOR);
        }, 6000);
    }

    setTimeout(function () {
        dynamodb_doctor_post();
    }, 6000);


    /*--------------------dynamodb doctor recommend% end--------------------*/

    //test



    /*
    if (confirm()) {

    } else {

    }
    */

    /*
    setTimeout(function () {
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                console.log("you're at the bottom of the page");
            }
        };
    }, 5000);
    */

})();