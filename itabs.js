/**
 * iTabs v1.4 - 02/08/2016
 * divide of content by tab
 *
 * developed by Wallace Rio <wallrio@gmail.com>
 * wallrio.com
 * 
 * tested on firefox/chrome/opera/ie8/safari
 * 
 */


(function(){

	var TabNow = null;
	var slideNow = null;
	var countITabs = 0;


	var preFunctions = function(idTab){
		TabNow = idTab || null;
		Functions.TabNow = idTab || null;
		return Functions;
	}

	var Functions = {
		TabNow:null,
		slideNow:null,
		actClickTab:null,
		loaded:null,
		coutEventTab:0,
		eventClickFunctions:{},
		ready:function(callback){
			Functions.loaded = callback;
		},
		clickTab:function(callback){			
			Functions.actClickTab = callback;
		},
		editTab:function(nameTab,newName){
			var title = '';
			var forid = '';

			if(typeof nameTab == 'object'){
				title = nameTab.title;
				forid = nameTab.for;
			}else{
				title = nameTab;
				forid = nameTab;
			}

			var nameTabFit = nameTab.replace(/ /g,"");
			var foridTabFit = forid.replace(/ /g,"");
			$('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]').find('label').html(newName);
		},
		delTab:function(nameTab,callback){

			var title = '';
			var forid = '';

			if(typeof nameTab == 'object'){
				title = nameTab.title;
				forid = nameTab.for;
			}else{
				title = nameTab;
				forid = nameTab;
			}

			var nameTabFit = title.replace(/ /g,"");
			var foridTabFit = forid.replace(/ /g,"");
						
			if(callback)
				var returns = callback();

			if(returns == false)
				return;

			var prevTab = $('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]').prev().attr('data-for');

			$('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]').remove();
			$('#'+TabNow+' > [data-rel="slides"] [data-id="'+foridTabFit+'"]').remove();


			Functions.openTab(prevTab,null,TabNow);

			

		},
		addTab:function(nameTab,callback,active,htmlToName,clickCallbak){
			var title = '';
			var forid = '';

			if(typeof nameTab == 'object'){
				title = nameTab.title;
				forid = nameTab.for;
			}else{
				title = nameTab;
				forid = nameTab;
			}

			if(callback == undefined)
				callback = '';
			

			if(clickCallbak == undefined)
				clickCallbak = '';

			var nameTabFit = title.replace(/ /g,"");
			var foridTabFit = forid.replace(/ /g,"");
			
			var node = document.createElement("a");
			node.setAttribute('data-rel','tab');
			node.setAttribute('data-for',foridTabFit);			
			node.setAttribute('data-idtab',TabNow);			
			node.setAttribute('data-actionclick',clickCallbak);			
			node.innerHTML = '<label>'+title+'</label>';		
			
			var node2 = document.createElement("div");
			node2.innerHTML = htmlToName;		
			
			var node3 = document.createElement("div");
			node3.setAttribute('data-rel','slide');
			node3.setAttribute('data-id',foridTabFit);			
			node3.setAttribute('data-idtab',TabNow);	

			if( document.querySelector('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]') != null){
				Functions.openTab(nameTabFit,null,TabNow);						
			}else{
				document.querySelector('#'+TabNow+' > [data-rel="tabs"]').appendChild(node);		
				node.appendChild(node2);		
			}

				
			

			

					

			var action = {
				html:function(html){					
					node3.innerHTML = html;
				}
			}

			if(typeof callback == 'function'){
				node3.innerHTML = callback(action);		
			}else if(typeof callback == 'string'){
				node3.innerHTML = callback;		
			}
			document.querySelector('#'+TabNow+' > [data-rel="slides"]').appendChild(node3);		
			
			
			if(active == true)
				Functions.openTab(foridTabFit,null,TabNow);		
					
		},
		action:{			
			tab:function(dataFor){
				dataFor = dataFor || Functions.slideNow;				 
				return {
					content:function(string){										
						var slide = document.querySelector('[data-rel="tab"][data-idtab="'+Functions.TabNow+'"][data-for="'+dataFor+'"]');

						slide.innerHTML = string;
					
					}
				}
			},
			slide:function(dataFor){
				dataFor = dataFor || Functions.slideNow;				 
				return {
					content:function(string){										
						var slide = document.querySelector('[data-rel="slide"][data-idtab="'+Functions.TabNow+'"][data-id="'+dataFor+'"]');
						slide.innerHTML = string;
					
					}
				}
			}

		},
		event:function(e){

			var eArray = e.split(' ');
			return {
				tab:function(callback,dataFor){	
					
					Functions.coutEventTab++;
					// alert(Functions.eventClickFunctions[dataFor]);

					if(dataFor == null || dataFor == undefined){

						if(typeof Functions.eventClickFunctions['!all'] == 'undefined')
							Functions.eventClickFunctions['!all'] = {};					


						
						

						Functions.eventClickFunctions['!all'][Functions.coutEventTab] = callback;					
						

						
						// var func = Functions.eventClickFunctions['!all'][Functions.coutEventTab];
						

						Functions.addEvent(window,'load',function(element){

							$('[data-rel="tab"][data-idtab="'+Functions.TabNow+'"]').click(function(){
								/*var elt = $(this).attr('data-for');
								if(callback)
									callback(elt);*/
							});
						});
						return false;
					}


					if(typeof Functions.eventClickFunctions['!unit'] == 'undefined')
							Functions.eventClickFunctions['!unit'] = {};				
					
						Functions.eventClickFunctions['!unit'][dataFor] = callback;					
						

					

					Functions.slideNow = dataFor;
					Functions.addEvent(window,'load',function(element){

						var tab = document.querySelector('[data-rel="tab"][data-idtab="'+Functions.TabNow+'"][data-for="'+dataFor+'"]');						
						if(tab == null)
							return false;
						
						for (var i = 0;i<eArray.length; i++) {

							/*Functions.addEvent(tab,eArray[i],function(element){
								if(callback)
									callback(dataFor);							
							});*/
						};
					});
																			
				}
			}		
		},
		addEvent:function(objs,event,callback,mode,elem2,table){
			
			if(mode == undefined)
				mode = true;

			if(objs == undefined)
				objs = window; 
			if(objs.addEventListener){ 				
				return objs.addEventListener(event,function(){
					if(callback)
						callback(objs,elem2,table);
				},mode); 
			}else if(objs.attachEvent){
				return objs.attachEvent('on'+event,function(){
					if(callback)
						callback(objs,elem2,table);
				}); 
			}
		},
		windowSize:function(){
				var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

				var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
				var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

			    D = document;
			    var y =  Math.max(
			        D.body.scrollHeight, D.documentElement.scrollHeight,
			        D.body.offsetHeight, D.documentElement.offsetHeight,
			        D.body.clientHeight, D.documentElement.clientHeight
			    );


			    var x =  Math.max(
			        D.body.scrollWidth, D.documentElement.scrollWidth,
			        D.body.offsetWidth, D.documentElement.offsetWidth,
			        D.body.clientWidth, D.documentElement.clientWidth
			    );

				var size = {
					document: {
						width: x,
						height: y
					},
					width: width,
					height: height,
					scrollLeft: scrollLeft,
					scrollTop: scrollTop,
					sizing: function(element){

						return {
							width:width-(document.querySelector(element).offsetLeft*2),
							height:height-(document.querySelector(element).offsetTop*2)
						}
					} 
				}

			return size;
		},
		FindByAttr:function(attribute, value,element){
			if(element == undefined)
				element = document;

		  var All = element.getElementsByTagName('*');
		  for (var i = 0; i < All.length; i++)       {
		    if (All[i].getAttribute(attribute) == value) { return All[i]; }
		  }
		},

		openTab:function(dataFor,mode,idTabNow){

			alert(idTabNow);
				return false;
			if(idTabNow == undefined)
			idTabNow = Functions.TabNow;
		
			if( mode == undefined)
				mode = 'normal';
										
			var tab = document.querySelector('[id="'+idTabNow+'"]').querySelectorAll('[data-rel="tab"][data-idtab="'+idTabNow+'"]');
			var slide = document.querySelector('[id="'+idTabNow+'"]').querySelectorAll('[data-rel="slide"][data-idtab="'+idTabNow+'"]');
			

			for(var i = 0;i<tab.length;i++){							
				if( typeof tab[i] == 'object' ){						
					if(mode == 'normal' )					
						tab[i].setAttribute('data-status','');																							
				}
			}

 			for(var i = 0;i<slide.length;i++){			
				 if( typeof slide[i] == 'object' ){									
					slide[i].setAttribute('data-status','');																							
				 }
			}		
			
			

		 	if(document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]')){
				document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]').setAttribute('data-status','active');


						 if(typeof Functions.actClickTab == 'function'){						
							Functions.actClickTab(dataFor,document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]'));
						}

					
						
					

					

		 	}
			

			var dataHash = document.querySelector('[data-idtab="'+idTabNow+'"]').getAttribute('data-hash');						 	
			if(dataHash == "true" || dataHash == true){
				 if(window.location.hash)
                    var hash = String(window.location.hash).replace('#',''); 
                                   
                 if(mode != 'init')
					 window.location = "#"+dataFor;
			}


			var actionTabclick = document.querySelector('[data-idtab="'+idTabNow+'"]').getAttribute('action-tabclick');

			if(actionTabclick){
				eval('var fn = '+actionTabclick+';');	
				var fn_option = {
					tab: {
						name:dataFor,
						content:document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]').innerHTML
					},
					slide: {
						name:dataFor,
						content:document.querySelector('[data-idtab="'+idTabNow+'"][data-id="'+dataFor+'"]').innerHTML,
					}
				};
				
				if(hash != undefined || mode != 'init')
				 fn(fn_option);
							
			}


			
			/*if(typeof Functions.eventClickFunctions['!unit'] != 'undefined'){
				if(typeof Functions.eventClickFunctions['!unit'][dataFor] != 'undefined'){
					var funcUnit = Functions.eventClickFunctions['!unit'][dataFor];
					 funcUnit(dataFor);
				}
			}
			
			if(typeof Functions.eventClickFunctions['!all'] != 'undefined'){	
				if(typeof Functions.eventClickFunctions['!all'][Functions.coutEventTab] != 'undefined'){			
					var func = Functions.eventClickFunctions['!all'][Functions.coutEventTab];
					func(dataFor);
				}
			}
*/




			if(document.querySelector('[data-idtab="'+idTabNow+'"][data-id="'+dataFor+'"]'))
				document.querySelector('[data-idtab="'+idTabNow+'"][data-id="'+dataFor+'"]').setAttribute('data-status','active');


									
		},
		init:function(){
			var itabs = document.getElementsByClassName('itabs');	

			for(var i = 0;i<itabs.length;i++){

				var idTab = 'itabs'+countITabs;
										
			

				

				var dataStatus_key = '';
				var tab = itabs[i].querySelectorAll('[data-rel="tab"]');
				var slide = itabs[i].querySelectorAll('[data-rel="slide"]');
				
				

				if(itabs[i].getAttribute('data-counttab') == tab.length)
					continue;


				itabs[i].setAttribute('data-counttab',tab.length);				




				if(itabs[i].getAttribute('id') == null){					
					itabs[i].setAttribute('id',idTab);		
					itabs[i].setAttribute('data-idtab',idTab);			
				}else{
					idTab = itabs[i].getAttribute('id');
					itabs[i].setAttribute('data-idtab',idTab);

				}

				for(var a = 0;a<slide.length;a++){				
					 if( typeof slide[a] == 'object' ){

						 slide[a].setAttribute('data-idtab',idTab);							
					 }
				}
				
				for(var a = 0;a<tab.length;a++){
					if( typeof tab[a] == 'object' ){
						var dataFor = tab[a].getAttribute('data-for');
						var dataStatus = tab[a].getAttribute('data-status');						
						if(dataStatus == 'active'){
							dataStatus_key = dataFor;														
						}

						tab[a].setAttribute('data-idtab',idTab);	
						Functions.addEvent(tab[a],'click',function(element){							
							var idTabNow = element.getAttribute('data-idtab');
							var dataFor = element.getAttribute('data-for');						
							Functions.openTab(dataFor,null,idTabNow);
						});
					}					
				}
				
				alert(idTab);

				var dataHash = itabs[i].getAttribute('data-hash');				
				if((dataHash == "true" || dataHash == true) && window.location.hash){

				
                    var hash = String(window.location.hash).replace('#','');    
                    
                    // abre a aba conforme o hash da url do navegador
	                if(hash != undefined && hash.length != 0 ){    	                	
	                	// alert(hash);
	                	Functions.openTab(hash,null,idTab);	   
	                }                     
	                
				}else{
					
					
					if(document.querySelector('#'+idTab+' > [data-rel="tabs"]').querySelector('[data-idtab="'+idTab+'"][data-rel="tab"][data-status="active"]')){
						dataStatus_key = document.querySelector('#'+idTab+' > [data-rel="tabs"]').querySelector('[data-idtab="'+idTab+'"][data-rel="tab"][data-status="active"]').getAttribute('data-for');										

						if(dataStatus_key != ''){
							 Functions.openTab(dataStatus_key,'init',idTab);	
						}


					}
				}
				/*Functions.loaded();*/
				countITabs++;



				
			}
		}
	}


	// start the itabs, run on load finish page	
	Functions.addEvent(window,'load',function(){	
		Functions.init();
		setInterval(function(){
			Functions.init();
		},1000);
	});

	window.itabs = preFunctions;
})();
