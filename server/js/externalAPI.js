var request=require('request');
var unirest = require('unirest');
//var express = require('express');
function dictionaryAPI1(req,res){
  
var headersOpt = {  
    "content-type": "application/ld+json",
	'Authorization': 'apikey token=921153a2-c815-4bf9-ace8-0e78fca3694d'

};
request(
        {
        method:'get',
	//	url:'http://data.bioontology.org/annotator?text='+req.query.term,
		//url:'http://sissvoc.ereefs.info/sissvoc/ereefs/resource?uri=http://environment.data.gov.au/def/object/'+req.query.term,
        //url:'http://data.bioontology.org/search?q='+req.query.term+'&ontologies=NCIT,GO&roots_only=true', 
        //url:'https://researchdata.ands.org.au/registry/services/8d4d9fd926ab/getMetadata.json/?'+req.query.term, 
		url:'http://data.bioontology.org/search?q='+req+'&ontologies=&include_properties=false&include_views=false&includeObsolete=false&require_definition=false&exact_match=false&categories=',
        headers: headersOpt,
        json: true,
    }, function (error, result, body) {  
      
  //console.log(result.status, result.headers, result.body);
//console.log(req.headers['content-type']);
 //var jsonData = JSON.parse(result.body);
 var jsonData = result.body;
 var myresults =[];
 //res.json(jsonData);
 var outStr= {'label':'',
				'definition':'',
				'link':'',
				'dictionary':''};
 //outStr.push(req.body.term.toLowerCase());
 try{
	 
for(var myobject in jsonData){
    //console.log("Id =" + jsonData[myobject]);
	if(myobject=='collection'){
     console.log("key = " + jsonData[myobject]);
	 for(var myobject1 in jsonData[myobject]){
		 //console.log("Id =" + jsonData[myobject][myobject1].links)
		 for(var myobject2 in jsonData[myobject][myobject1]){
			// console.log("Id =" + jsonData[myobject][myobject1].links[myobject2].ui);
			
	 if(myobject2=="links"){
		 //for(var myobject3 in jsonData[myobject][myobject1][myobject2]){
		  console.log("Id =" + jsonData[myobject][myobject1][myobject2].ui);
		 outStr.link=jsonData[myobject][myobject1][myobject2].ui; 
	 }
		//	}
		 
	 if(myobject2=="definition"){
		 console.log("Id =" + jsonData[myobject][myobject1][myobject2][0]);
		 outStr.definition=jsonData[myobject][myobject1][myobject2][0]; 
	 }
	if(outStr.definition==""){
		// console.log("Id =" + jsonData[myobject][myobject1][myobject2][0]);
		 outStr.definition='No definition'; 
	 }
	 /* if(myobject1=='rdfs:label'){
		 
			outStr.label=jsonData[myobject]; 
		 } */
		 if(myobject2=='prefLabel'){
			console.log("Id =" + jsonData[myobject][myobject1][myobject2]);
			outStr.dictionary=jsonData[myobject][myobject1][myobject2]; 
		 }
		
		
		var onedef ={
                        label: req,
                        definition: outStr.definition,
                        link: outStr.link,
                        dictionary: outStr.dictionary
                   }
		 }
		  myresults.push(onedef);  
	 }
}	
}
	

               // for (var i=0; i< outStr.definition.length; i++){
                   
                   
                //}   
	console.log(outStr);
    res.json(myresults);
    return myresults;
	}
catch(err){
console.log(outStr);
 res.status(404).json(err);
}
});

}
/////Adapter-2

function dictionaryAPI2(req,res){
    //this.req = req;
    //adapter2.get('/api/adaptor/dictionary2', function (req, res){
      console.log(req);
      //http://registry.it.csiro.au/def/keyword/nature/subjects/physical-sciences
  // These code snippets use an open-source library. http://unirest.io/nodejs
  unirest.get('http://registry2.it.csiro.au/def/object/'+req)
  //.header("X-Mashape-Key", "ARNFwcNHxjmshy789XnzIHkLVtKDp1tAO7rjsnvkQUOoR6NB0T")
  .header("Accept", "application/ld+json")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
  console.log(result.statusCode);
   //var jsonData = JSON.parse(result.body);
   var jsonData = result.body;
   //res.json(jsonData);
   var outStr= {'label':'',
                  'definition':'',
                  'link':'',
                  'dictionary':''};
   //outStr.push(req.body.term.toLowerCase());
   try{
       
  for(var myobject in jsonData){
      // console.log("Id =" + jsonData[myobject]);
      // console.log("key = " + myobject);
       
       if(myobject=="@id"){
           outStr.link=jsonData[myobject]; 
       }
  
       if(myobject=="dct:description"){
           outStr.definition=jsonData[myobject]; 
       }
       
       if(myobject=='rdfs:label'){
           
              outStr.label=jsonData[myobject]; 
           }
           if(myobject=='dc:source'){
           
              outStr.dictionary=jsonData[myobject]; 
           }
          }
      
  var myresults =[];
                 // for (var i=0; i< outStr.definition.length; i++){
                      var onedef ={
                          label: req,
                          definition: outStr.definition,
                          link: outStr.link,
                          dictionary: outStr.dictionary
                     }
                      myresults.push(onedef);
                  //}   
      //console.log(outStr);
      res.json(myresults);
     // this.req = myresults;
      }
  catch(err){
  console.log(outStr);
   res.status(404).json(err);
  }
  });
  //});
  };
function dictionaryAPI3(req,res){
    console.log(req.query);
	//http://registry.it.csiro.au/def/keyword/nature/subjects/physical-sciences
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get('http://registry.it.csiro.au/def/keyword/nature/subjects/'+req)
//.header("X-Mashape-Key", "ARNFwcNHxjmshy789XnzIHkLVtKDp1tAO7rjsnvkQUOoR6NB0T")
.header("Accept", "application/ld+json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
console.log(result.statusCode);
 //var jsonData = JSON.parse(result.body);
 var jsonData = result.body;
 //res.json(jsonData);
 var outStr= {'label':'',
				'definition':'',
				'link':'',
				'dictionary':''};
 //outStr.push(req.body.term.toLowerCase());
 try{
	 
for(var myobject in jsonData){
    // console.log("Id =" + jsonData[myobject]);
    // console.log("key = " + myobject);
	 
	 if(myobject=="@id"){
		 outStr.link=jsonData[myobject]; 
	 }
	if(myobject=='rdfs:isDefinedBy'){
		 for(var myobject1 in jsonData[myobject]){
			 if(myobject1=='@id'){
			outStr.dictionary=jsonData[myobject][myobject1]; 
			 }
		 }
	}
	 if(myobject=="dct:description"){
		 for(var myobject1 in jsonData[myobject]){
			 if(myobject1=='@value'){
			outStr.definition=jsonData[myobject][myobject1]; 
			 }
		 }
		 }
	 
	 if(myobject=='rdfs:label'){
		 for(var myobject1 in jsonData[myobject]){
			 if(myobject1=='@value'){
			outStr.label=jsonData[myobject][myobject1]; 
			 }
		 }
		}
}
var myresults =[];

               // for (var i=0; i< outStr.definition.length; i++){
                    var onedef ={
                        label: req,
                        definition: outStr.definition,
                        link: outStr.link,
                        dictionary: outStr.dictionary
                   }
                    myresults.push(onedef);
                //}   
	console.log(outStr);
	res.json(myresults);
	}
catch(err){
console.log(outStr);
 res.status(404).json(err);
}
});
};

function dictionaryAPI4(req,res){
    console.log(req.query);
	//http://registry.it.csiro.au/def/keyword/nature/subjects/physical-sciences
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get("https://mashape-community-urban-dictionary.p.rapidapi.com/define?term="+req)
.header("X-RapidAPI-Key", "26bf702acemshd2964d930eed800p1cdbc2jsne13777c9db30")
.end(function (result) {
  //console.log(result.status, result.headers, result.body);

 //var jsonData = JSON.parse(result.body);
 var jsonData = result.body;
 //res.json(jsonData);
 var defAll=[];
 var linkAll=[];
 var dicAll=[];
 var outStr= {'label':'',
				'definition':'',
				'link':'',
				'dictionary':''};
 //outStr.push(req.body.term.toLowerCase());
 try{
	 
for(var myobject in jsonData){
		//console.log(jsonData[myobject]);
		for(var myobject1 in jsonData[myobject]){
			
			for(var myobject2 in jsonData[myobject][myobject1]){
			if (myobject2 == "definition") {
			//console.log(jsonData[myobject][myobject1][myobject2]);
                            
                           
                            defAll.push(jsonData[myobject][myobject1][myobject2]);
                         
                            console.log(defAll);

                        }
						if (myobject2 == "permalink") {
					//console.log(jsonData[myobject][myobject1][myobject2]);
                            
                            
                                linkAll.push(jsonData[myobject][myobject1][myobject2]);
                           
                            console.log(linkAll);

                        }
		if(myobject2=="author"){
			 //console.log(jsonData[myobject][myobject1]);
                            
                           dicAll.push(jsonData[myobject][myobject1][myobject2]);
                           
                            console.log(dicAll);
		}
		}
		}
		
	}
	
	var myresults =[];

                for (var i=0; i< defAll.length; i++){
                    var onedef ={
                        label: req,
                        definition: defAll[i],
                        link: linkAll[i],
                        dictionary: dicAll[i]
                    }
                    myresults.push(onedef);
                }    
	//outStr.definition=defAll;
	//outStr.label=req.query.term;
	console.log(myresults);
	res.json(myresults);
	}
catch(err){
console.log(outStr);
 res.status(404).json(err);
}
});
}
function dictionaryAPI5(req,res){
    console.log(req.query);
	//http://registry.it.csiro.au/def/keyword/nature/subjects/physical-sciences
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get('https://www.dictionaryapi.com/api/v3/references/medical/json/'+req+'?key=b7a8dc41-a4f5-4fe7-8935-4be1da20037d')
//.header("X-Mashape-Key", "ARNFwcNHxjmshy789XnzIHkLVtKDp1tAO7rjsnvkQUOoR6NB0T")
.header("Accept", "application/ld+json")
.end(function (result) {
 // console.log(result.status, result.headers, result.body);
console.log(result.statusCode);
 //var jsonData = JSON.parse(result.body);
 var jsonData = result.body;
 //res.json(jsonData);
   var link ='https://www.dictionaryapi.com/api/v3/references/medical/json/'+ req +'?key=b7a8dc41-a4f5-4fe7-8935-4be1da20037d';
 var defAll=[];
	var outStr= {'label':'',
				'definition':'',
				'link':'',
				'dictionary':''};
 //outStr.push(req.body.term.toLowerCase());
 try{
	 
for(var myobject in jsonData){
		//console.log(jsonData[myobject]);
		for(var myobject1 in jsonData[myobject]){
			if (myobject1 == 'shortdef') {

                            //console.log(jsonData[myobject][myobject1]);
                            for(var i=0; i<jsonData[myobject][myobject1].length; i++)
                            {
                                defAll.push(jsonData[myobject][myobject1][i]);
                            }
                            
                            console.log(defAll);

                        }
		if(myobject1=='meta'){
			outStr.dictionary=jsonData[myobject][myobject1].src;
		}
		}
		
		
	}
	
	var myresults =[];

                for (var i=0; i< defAll.length; i++){
                    var onedef ={
                        label: req,
                        definition: defAll[i],
                        link: link,
                        dictionary: outStr.dictionary
                    }
                    myresults.push(onedef);
                }    
	//outStr.definition=defAll;
	//outStr.label=req.query.term;
	console.log(myresults);
	res.json(myresults);
	}
catch(err){
console.log(outStr);
 res.status(404).json(err);
}
});
}
module.exports={
    dictionaryAPI1:dictionaryAPI1,
    dictionaryAPI2:dictionaryAPI2,
    dictionaryAPI3:dictionaryAPI3,
    dictionaryAPI4:dictionaryAPI4,
    dictionaryAPI5:dictionaryAPI5
}