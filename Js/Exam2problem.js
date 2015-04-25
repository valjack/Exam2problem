function MenuChoice()
 {
    if (document.getElementById("menu").value=="Display Categories")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Create Product Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Update Product Description")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Delete Product Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Display About Me Area")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
 }

function getAllCategoriesList()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object

    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/GetAllCategories";
    document.getElementById("categorylist").innerHTML = objRequest;
    

    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4&& objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
    //Initiate the server request
    objRequest.open("GET",url,true);
    objRequest.send();   
}
function GenerateOutput(result)
{
    var count = 0;
    for (count=0; count < categorylist;count++);
    var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    
    //Loop to extract data from the response object
    for(count=0;count<result.GetAllCategoriesResult.length;count++)
    
    {
       displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + 
       "</td><td>" + result.GetAllCategoriesResult[count].CName +
       "</td><td>" + result.GetAllCategoriesResult[count].CDescription +"</td></tr>";
    }
    
    document.getElementById("categorylist").innerHTML = displaytext;
        for (count=0; count < customerlist;count++)
    {
    }
    document.getElementById("categoryid").innerHTML=result;
}

function createNewCategory()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";

    // Collect Customer data from web page
    var nmcategory = document.getElementById("categorynm").value;
    var catgdescription = document.getElementById("categorydesc").value;
    
    //Create the parameer string
    var newcategory = '{"CName":"'+nmcategory+'","CDescription":"'+catgdescription+'"}';
    
    
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var results = JSON.parse(objRequest.responseText);
            OperationResults(results);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
    
}

function OperationResults(outpt)
{
    if (outpt.WasSuccessful==1)
    {
        document.getElementById("newcategory").innerHTML = "The operation completed successfully!"
    }
    else
    {
        document.getElementById("newcategory").innerHTML = "The operation was not successful!"
        + "<br>" + outpt.Exception;
    }
}

function updateCategoryDescr()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";

    // Collect Customer data from web page
    var categoryid = document.getElementById("categoryid").value;
    var categorydesc = document.getElementById("updcategorydesc").value;
     
    
    //Create the parameer string
    var newcatdesc = '{"CID":"'+ categoryid +'","CDescription":"'+ categorydesc +'"}';
        
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var descresult = JSON.parse(objRequest.responseText);
            DescrupdResult(descresult);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcatdesc);
}

function DescrupdResult(updateoutpt)
{
    if (updateoutpt == 1)
    {
        document.getElementById("descresult").innerHTML = "The operation completed successful!";
    }
    else if (updateoutpt== -2)
    {
      document.getElementById("descresult").innerHTML = "The operation was not successful!"
      + "<br>" + "Operation failed because the data string supplied could not be deserialized into the service object";
    }
    else if (updateoutpt == -3)
    {
      document.getElementById("descresult").innerHTML = "The operation was not successful!"
      + "<br>" + "Operation failed because a record with the supplied Order ID could not be found.";
    }
    else
    {
        document.getElementById("descresult").innerHTML = "The operation was not successful!"
        + "<br>" +"Operation failed with an unspecified error.";
    }
}
   
   
function DeleteCategory()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object

    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url+= document.getElementById("categoryid").value;
    document.getElementById("delcategoryresult").innerHTML = objRequest;
     
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4&& objRequest.status == 200)
        {
            var delcategorydes = JSON.parse(objRequest.responseText);
            DeleteRcategory(delcategorydes);
        }
    }
    //Initiate the server request
    objRequest.open("GET",url,true);
    objRequest.send();
}
function DeleteRcategory(deldescoutpt)
{
    if (deldescoutpt.WasSuccessful==1)
    {
      var r=confirm("Are you sure you want to delete?")
      {
         if (r==true)
         {
            document.getElementById("delcategoryresult").innerHTML = "The operation completed successfully!"
         }
         else (r==false)
         {
            document.getElementById("delcategoryresult").innerHTML = "The operation was not successful!"
        + "<br>" + deldescoutpt.DeleteCategoryResult.Exception;
         }
      }
    }
      }
