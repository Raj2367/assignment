var movies = [];               
function autocomplete(inp,hinp, arr) 
{
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
   
    var val,x=0;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) 
    {     
                                              
        var a, b, c, i, e;
        val = this.value; 
        //console.log(val.length);   
        if(val.length==0)
        {
            /*close any already open lists of autocompleted values if input length is 0*/
            closeAllLists();  
            closeAllLists();  
            closeAllLists();  
        }    
        //console.log(val.length);
        if (val.length>2) 
        {
            fetch("https://www.omdbapi.com/?s="+val+"&apikey=3a455a75").then(response => response.json()).then(json => {                                 
                    // Loop through each data and add to the countries array                        
                    json.Search.forEach(movie => {                      
                        if(!movies.includes(`${movie.Title}`))
                        {
                            movies.push(`${movie.Title}`);                                    
                        }
                    });                                                                                  

                    /*create a DIV element that will contain the items (values):*/   
                    a = document.createElement("DIV");
                    a.setAttribute("id", this.id + "autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");

                    /*append the DIV element as a child of the autocomplete container:*/
                    this.parentNode.appendChild(a);

                    /*for each item in the array...*/
                    for (i = 0; i < arr.length; i++) 
                    {
                        /*check if the item starts with the same letters as the text field value:*/
                        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) 
                        {
                            /*create a DIV element for each matching element:*/
                            b = document.createElement("DIV");

                            /*make the matching letters bold:*/
                            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                            b.innerHTML += arr[i].substr(val.length);

                            /*insert a input field that will hold the current array item's value:*/
                            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                            /*execute a function when someone clicks on the item value (DIV element):*/
                            b.addEventListener("click", function (e) 
                            {
                                /*insert the value for the autocomplete text field:*/
                                inp.value ="";     
                                c = document.createElement("DIV");
                                c.innerHTML += "<input type='text' id='myList"+x+"' value='"+this.getElementsByTagName("input")[0].value+"' disabled style='background-color:white; border-color:black; border-width:1px; width:25%; float:left; font-weight:bold; margin-top:10px; margin-bottom:5px;'><button id='myList"+x+"'type='submit' value='X' style='background-color:#eb7575; margin-right:15px; margin-top:10px; margin-bottom:5px; float:left; height: 40px;'>X</button>";
                                x++;
                                
                                var d = a.parentNode;
                                d.replaceChild(c,a);
                                c.appendChild(a);
                                
                                //Remove the movie name when click that name
                                c.addEventListener("click", function (e) {
                                    e = e || window.event;

                                    //get id of the particular target 
                                    var target = e.target || e.srcElement,
                                        text = target.textContent || target.innerText;  
                                    console.log(target);
                                    //remove the name from the div when click on it
                                    if(target.value=="X")
                                    {
                                        var list = document.getElementById(target.id);   
                                        list.parentNode.removeChild(list);
                                        var list1 = document.getElementById(target.id); 
                                        list1.parentNode.removeChild(list1);  
                                    }                                  
                                });
                                /*close the list of autocompleted values,
                                (or any other open lists of autocompleted values:*/
                                closeAllLists();
                                closeAllLists();  
                                closeAllLists();  
                            });
                            
                            a.appendChild(b);
                    }
                }                                                                                      
                //console.log(movies);                        
            });
        }                                            
    });
    
    function closeAllLists(elmnt) 
    {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) 
        {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {        
        closeAllLists(e.target);
    });
    
    
}        

/*initiate the autocomplete function on the "myInput" element, and pass along the movies array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"),document.getElementById("myHiddeninp"), movies);