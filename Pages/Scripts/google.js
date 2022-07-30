
var signedIn;

/**
        *  On load, called to load the auth2 library and API client library.
        */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

var listOfGames = new Set();

function parse(info) {
    var range = info;
    var crntplyng = new Set();
    if (range.values.length > 0) {
        for (i = 0; i < range.values.length; i++) {
            var row = range.values[i];
            // Print columns A and E, which correspond to indices 0 and 4.
            /*appendPre(row[0]);*/
            listOfGames.add(row[0]);
            //console.log(row[2])
            if (row[2] === "Playing") {
                // console.log(row[0]);
                //var details = row[0] + "~" + row[1];
                crntplyng.add(row[0] + "~" + row[1]);
            }
        }
        
    }
    return crntplyng;
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        console.log("set signin " + signedIn);

        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        var rangeSelected = 'Amir\'s Library' + '!A:F' 

        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1rh6OBMPmuSerG5XRubUZIQqy-l5SXdxkNoloL7m638c',
            range: rangeSelected,
        }).then(function (response) {
            console.log(response.result);
            var ainfo = response.result;
            var acur = parse(ainfo);
            parse(ainfo);

        });
        
        var rangeSelected = 'Hassan\'s Library' + '!A:F' 

        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1rh6OBMPmuSerG5XRubUZIQqy-l5SXdxkNoloL7m638c',
            range: rangeSelected,
        }).then(function (response) {
            console.log(response.result);
            var alinfo = response.result;
            var alcur = parse(alinfo);
            parse(alinfo);
            
            console.log(alcur);


            
        });

        var rangeSelected = 'Barre\'s Library' + '!A:F'
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1rh6OBMPmuSerG5XRubUZIQqy-l5SXdxkNoloL7m638c',
            range: rangeSelected,
        }).then(function (response) {
            console.log(response.result);
            var binfo = response.result;
            var bcur = parse(binfo);
            parse(binfo);

            var ul = document.createElement('ul');
            ul.setAttribute('id', 'myUL');

            document.getElementById('renderList').appendChild(ul);


            listOfGames.forEach(function (value) {
                var a = document.createElement('a');
                var li = document.createElement('li');
                ul.appendChild(li);
                li.appendChild(a)
                li.style.display = "none";
                a.setAttribute("href", "?" + value);
                a.innerHTML = a.innerHTML + value;
            });
            console.log(listOfGames);
        });
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;

        
        

    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
    

    


}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */



function getallTitles() {
   

    var acur = listTitles('Amir\'s Library', listOfGames);
    var bcur = listTitles('Barre\'s Library', listOfGames);
    var alcur = listTitles('Hassan\'s Library', listOfGames);


    
    console.log(listOfGames);
    
    acur2 = acur.values()
    console.log(acur);
    setTimeout(function () {
        console.log("herrro");
        for (const a of acur) {
            console.log("hello" + a[0]);
        }
    },15000)
    
    
    
    
    
    /*for (const entry of it) {
        console.log(entry + " " + "\n");
    }
*/

    if (ul.childNodes.length == 0) { ul.remove();}
    console.log("Complete " + ul.childNodes.length);

    
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {

        console.log("should close");
        $('#myModal').modal('hide');

        
        authorizeButton.style.display = 'none';
     

    } else {
        authorizeButton.style.display = 'block';
        
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}




/**
         * Append a pre element to the body containing the given message
         * as its text node. Used to display the results of the API call.
         *
         * @param {string} message Text to be placed in pre element.
         */
function appendPre(message,id) {
    var pre = document.getElementById(id);
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 */

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("renderList").querySelector('#Mysearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("renderList").querySelector("#myUL");
    /*ul = rl.getElementByTagName("myUL")*/
    li = ul.getElementsByTagName('li');
    console.log(filter);
    
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = ul.getElementsByTagName('a')[i];
        
        txtValue = a.textContent || a.innerText;
        console.log(txtValue);

        if (txtValue.toUpperCase().indexOf(filter) > -1 && (filter.length > 1)) {
            li[i].style.display = "";
            
        } else {
            li[i].style.display = "none";
        }
    }
}




function listTitles(sheetSelected) {
    
    var rangeSelected = sheetSelected + '!A:F'

    var crntplyng = [];
    
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rh6OBMPmuSerG5XRubUZIQqy-l5SXdxkNoloL7m638c',
        range: rangeSelected,
    }).then(function (response) {
        var range = response.result;
        
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                // Print columns A and E, which correspond to indices 0 and 4.
                /*appendPre(row[0]);*/
                listOfGames.add(row[0]);
                //console.log(row[2])
                if (row[2] === "Playing") {
                   // console.log(row[0]);
                    //var details = row[0] + "~" + row[1];
                    crntplyng.push(row[0] + "~" + row[1]);
                }
            }

/*            listOfGames.forEach(function (value) {
                console.log(value + " " + "\n");
            })*/
        

        } else {
            appendPre('No data found.');
        }
    }, function (response) {
        appendPre('Error: ' + response.result.error.message);
    });

    console.log(crntplyng);
    return crntplyng;
    
}


function getRecentlyPlayed(sheetSelected) {

    var rangeSelected = sheetSelected + '!A:C'

    
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1rh6OBMPmuSerG5XRubUZIQqy-l5SXdxkNoloL7m638c',
        range: rangeSelected,
    }).then(function (response) {
        var range = response.result;
        
        if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
                var row = range.values[i];
                if (row[2] == "Status") {
                    appendPre()
                }    
                        
            }

        

        } else {
            appendPre('No data found.');
        }
    }, function (response) {
        appendPre('Error: ' + response.result.error.message);
    });
    
}