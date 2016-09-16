/**
 * iTabs v1.15 - 16/09/2016
 * divide of content by tab
 *
 * developed by Wallace Rio <wallrio@gmail.com>
 * wallrio.com
 * 
  * tested on firefox v48 /chrome v38/ IE 8
 *
 * IE 8: mode banner autoslide
 * 	It needs to be corrected abnormality
 * 	
 */


(function() {
if (!document.getElementsByClassName) {
    var indexOf = [].indexOf || function(prop) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === prop) return i;
        }
        return -1;
    };
    getElementsByClassName = function(className, context) {
        var elems = document.querySelectorAll ? context.querySelectorAll("." + className) : (function() {
            var all = context.getElementsByTagName("*"),
                elements = [],
                i = 0;
            for (; i < all.length; i++) {
                if (all[i].className && (" " + all[i].className + " ").indexOf(" " + className + " ") > -1 && indexOf.call(elements, all[i]) === -1) elements.push(all[i]);
            }
            return elements;
        })();
        return elems;
    };
    document.getElementsByClassName = function(className) {
        return getElementsByClassName(className, document);
    };

    if(Element) {
        Element.prototype.getElementsByClassName = function(className) {
            return getElementsByClassName(className, this);
        };
    }
}
})();


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
		actClickTab:Array(),
		loaded:null,
		coutEventTab:0,
		eventClickFunctions:{},
		ready:function(callback){			
			Functions.loaded = callback;
		},
		
		/**
		 * Remove acentos
		 * @param  {string} str 
		 * @return {string}        
		 */
		removeAccents:function(str) {
			str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
		    str = str.replace(/[àáâãäå]/g,"a");
		    str = str.replace(/[ÈÉÊË]/g,"E");	
		    return str.replace(/[^a-z0-9]/gi,' '); 
		},
		/**
		 * captura informação do itab atual
		 * @return {json} 
		 */
		get:function(){
			return {				
				tab: {
					name:Functions.slideNow,
					content:document.querySelector('[data-idtab="'+Functions.TabNow+'"][data-for="'+Functions.slideNow+'"]').innerHTML,
					element:document.querySelector('[data-idtab="'+Functions.TabNow+'"][data-for="'+Functions.slideNow+'"]')
				},
				slide: {
					name:Functions.slideNow,
					content:document.querySelector('[data-idtab="'+Functions.TabNow+'"][data-id="'+Functions.slideNow+'"]').innerHTML,
					element:document.querySelector('[data-idtab="'+Functions.TabNow+'"][data-id="'+Functions.slideNow+'"]')
				}

			}
		}
		,
		/**
		 * atribuir função ao abrir uma aba
		 * @param  {Function} callback [função anonima]
		 * @param  {string}   TabNow   [id da itab]
		 * @param  {string}   foridTab [id da aba]
		 * @return null            
		 */
		clickTab:function(callback,TabNow,foridTab){

			var count = Functions.actClickTab.length;
			
			Functions.actClickTab[count] = Object();

				for(var i=0;i<count;i++){								
					if(Functions.actClickTab[i]){
						if(Functions.actClickTab[i][TabNow]){
							if(Functions.actClickTab[i][TabNow]['tab'] == foridTab){

								Functions.actClickTab[i][TabNow] = {			
									'tab':foridTab,
									'callback':callback
								};
								return false;
							}
						}						
					}				
					
				}
		
			Functions.actClickTab[count][TabNow] = {			
				'tab':foridTab,
				'callback':callback
			};
			
		},


		/**
		 * altera titulo da aba
		 * @param  {string} nameTab [id da aba]
		 * @param  {string} newName [titulo da aba]
		 * @return null
		 */
		editTab:function(forid,newName,callback){
			
			var elem = document.querySelector('#'+TabNow+' > [data-rel="tabs"] [data-for="'+forid+'"] label');
			if(!elem){
				elem = document.querySelector('#'+TabNow+' > [data-rel="tabs"] [data-for="'+forid+'"]');				
			}
			elem.innerHTML = newName;		

			if(callback)
				callback();
		},

		/**
		 * apaga uma aba
		 * @param  {string}   nameTab  [id do itab]
		 * @param  {Function} callback [função anonima a ser executada após a exclusão]
		 * @return null
		 */
		delTab:function(nameTab,callback){

			var title = '';
			var forid = '';

			if(typeof nameTab == 'object'){
				title = nameTab['title'];
				forid = nameTab['for'];
			}else{
				title = nameTab;
				forid = nameTab;
			}

			var nameTabFit = title.replace(/ /g,"");
			var foridTabFit = forid.replace(/ /g,"");
						
						
			var prevTab = document.querySelector('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]').previousElementSibling;			

			if(prevTab){
				var prevTabId = prevTab.getAttribute('data-for');
			}else{
				prevTab = document.querySelector('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]').nextElementSibling;							
				if(prevTab)
				var prevTabId = prevTab.getAttribute('data-for');				
			}

			
			var elemTab = document.querySelector('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]');			
			elemTab.parentNode.removeChild(elemTab);

			var elemSlide = document.querySelector('#'+TabNow+' > [data-rel="slides"] [data-id="'+foridTabFit+'"]');			
			elemSlide.parentNode.removeChild(elemSlide);

			if(prevTabId)
				Functions.openTab(prevTabId,null,TabNow);

			if(callback)
				var returns = callback();

		},

		/**
		 * Adiciona uma nova aba
		 * @param {string}   nameTab     [id do itab]
		 * @param {Function} callback      [função a ser executada após a criação da aba]
		 * @param {boolean}   active     [abre ou não a aba após a criação]
		 * @param {string}   htmlToName    [html a ser incluido junto com o titulo da aba]
		 * @param {Function}   clickCallback [função a ser executada ao abrir a aba]
		 */
		addTab:function(nameTab,callback,active,htmlToName,clickCallback){
			var title = '';
			var forid = '';

			if(typeof nameTab == 'object'){
				title = nameTab['title'];
				forid = nameTab['for'];
			}else{
				title = nameTab;
				forid = nameTab;
			}

			if(htmlToName == undefined)
				htmlToName = '';

			if(callback == undefined)
				callback = '';
			

			if(clickCallback == undefined)
				clickCallback = '';

			var nameTabFit = title.replace(/ /g,"");
			var foridTabFit = forid.replace(/ /g,"");
			
			

			Functions.clickTab(clickCallback,TabNow,foridTabFit);

			var node = document.createElement("a");
			node.setAttribute('data-rel','tab');
			node.setAttribute('data-for',foridTabFit);			
			node.setAttribute('data-idtab',TabNow);			
			node.setAttribute('data-tabclick',clickCallback);			
			node.innerHTML = '<label>'+title+'</label>';		
			
			var node2 = document.createElement("div");
			node2.innerHTML = htmlToName;		
			
			var node3 = document.createElement("div");
			node3.setAttribute('data-rel','slide');
			node3.setAttribute('data-id',foridTabFit);			
			node3.setAttribute('data-idtab',TabNow);	
			node3.innerHTML = '';

			if( document.querySelector('#'+TabNow+' > [data-rel="tabs"] [data-for="'+foridTabFit+'"]') != null){				
				Functions.openTab(foridTabFit,null,TabNow);				
				return false;					
			}else{
				document.querySelector('#'+TabNow+' > [data-rel="tabs"]').appendChild(node);		
				node.appendChild(node2);		
			}

				
			

			var action = {
				html:function(html,callbackin){
						
					node3.innerHTML = html;					
					

				
					document.querySelector('#'+TabNow+' > [data-rel="slides"]').appendChild(node3);		

					var arr = node3.getElementsByTagName('script');

					for (var n = 0; n < arr.length; n++){
						var g = document.createElement('script');
						var s = document.getElementsByTagName('script')[0];

					    if(arr[n].src){
					    	g.src = arr[n].src;							
					    	var head = document.querySelector('#'+TabNow+' > [data-rel="slides"]');
					    	// var head = document.getElementsByTagName("head")[0];
							head.appendChild(g);
							// arr[n].remove();
							// s.parentNode.insertBefore(g, s);
					    }else{

							g.text = arr[n].innerHTML;
							head.appendChild(g);
							// g.text = "alert(\"hi\");"
							// s.parentNode.insertBefore(g, s);
					    }


					    
					}

					for (var n = 0; n < arr.length; n++){
						arr[n].remove();
					}

					if(callbackin)
						callbackin();
					

					
				}
			}

			if(typeof callback == 'function'){
				var returns = callback(action);
				if(returns)
					node3.innerHTML = returns; 	 	
				
			}else if(typeof callback == 'string'){
				node3.innerHTML = callback || '';		
			}
			
			
			if(active == true)
				Functions.openTab(foridTabFit,'init2',TabNow);		
					
		},
		action:{			
			tab:function(dataFor){
				dataFor = dataFor || Functions.slideNow;				 
				return {
					content:function(string){												
						var slide = document.querySelector('[data-rel="tab"][data-idtab="'+Functions.TabNow+'"][data-for="'+dataFor+'"]');						
						if(string != null && string != undefined){
							slide.innerHTML = string;
							return slide.innerHTML;
						}else{							
							return slide.innerHTML;
						}
					
					}
				}
			},
			slide:function(dataFor){
				dataFor = dataFor || Functions.slideNow;				 
				return {
					content:function(string){										
						var slide = document.querySelector('[data-rel="slide"][data-idtab="'+Functions.TabNow+'"][data-id="'+dataFor+'"]');
						if(string != null && string != undefined){
							slide.innerHTML = string;
							return slide.innerHTML;
						}else{							
							return slide.innerHTML;
						}
					
					}
				}
			}

		},
		event:function(e){
			
			
			

			var eArray = e.split(' ');
			return {
				tab:function(callback,dataFor){	
					

					Functions.coutEventTab++;
					

					var callTab = (function(element,TabNow){	
																		
								var elt = element.getAttribute('data-for');

								Functions.slideNow = elt;
																
								var fn_option = {
									tab: {
										name:elt,
										content:document.querySelector('[data-idtab="'+TabNow+'"][data-for="'+elt+'"]').innerHTML,
										element:document.querySelector('[data-idtab="'+TabNow+'"][data-for="'+elt+'"]')
									},
									slide: {
										name:elt,
										content:document.querySelector('[data-idtab="'+TabNow+'"][data-id="'+elt+'"]').innerHTML,
										element:document.querySelector('[data-idtab="'+TabNow+'"][data-id="'+elt+'"]')
									}

								};

								
								if(callback)
									callback(fn_option);
						});


					if(dataFor == null || dataFor == undefined){

						if(typeof Functions.eventClickFunctions['!all'] == 'undefined')
							Functions.eventClickFunctions['!all'] = {};					

						Functions.eventClickFunctions['!all'][Functions.coutEventTab] = callback;					
						
						

						
						
						
						

						Functions.addEvent(window,'load',function(element,TabNow){	
							
							Functions.init();

							if(!document.querySelector('.itabs[data-idtab="'+TabNow+'"]'))
								return false;
							


							var elementTabArray = document.querySelectorAll('[data-rel="tab"][data-idtab="'+TabNow+'"]');
							for(var i=0;i<elementTabArray.length;i++){
								Functions.addEvent(elementTabArray[i],e,function(element){	

									callTab(element,TabNow);
								});
							}
							
						

							

								if(window.location.hash){
									
	                   				var dataFor = String(window.location.hash).replace('#','');    	
									if(dataFor != undefined && dataFor.length != 0 ){
										callTab(document.querySelector('[data-idtab="'+TabNow+'"][data-for="'+dataFor+'"]'),TabNow);
									}
									return false;
								}else{
									var dataHashBool = null;
									var dataFor = null;
									var element = null;

									if(document.querySelector('.itabs[data-idtab="'+TabNow+'"]')){
										dataHashBool = document.querySelector('.itabs[data-idtab="'+TabNow+'"]').getAttribute('data-hash');							
										
										if(document.querySelector('.itabs[data-idtab="'+TabNow+'"]').querySelector('[data-status="active"]')){
											dataFor = document.querySelector('.itabs[data-idtab="'+TabNow+'"]').querySelector('[data-status="active"]').getAttribute('data-for');

											element = document.querySelector('.itabs[data-idtab="'+TabNow+'"]').querySelector('[data-status="active"]');
											callTab(element,TabNow);

											if(dataHashBool == 'true')
								 				window.location = "#"+dataFor;
										}
									}
								}

							},null,Functions.TabNow);
							



						return false;
					}


					if(typeof Functions.eventClickFunctions['!unit'] == 'undefined')
							Functions.eventClickFunctions['!unit'] = {};				
					
						Functions.eventClickFunctions['!unit'][dataFor] = callback;					
						

					

					Functions.slideNow = dataFor;
					Functions.addEvent(window,'load',function(element,callTab,TabNow){
						
						Functions.init();

						if(!document.querySelector('.itabs[data-idtab="'+TabNow+'"]'))
								return false;


						var tab = document.querySelector('[data-rel="tab"][data-idtab="'+TabNow+'"][data-for="'+dataFor+'"]');						

						if(tab == null)
							return false;
						
						for (var i = 0;i<eArray.length; i++) {
							Functions.addEvent(tab,eArray[i],function(element,callTab,TabNow){																															
								if(callTab){									
									callTab(element,TabNow);							
								}
							},null,callTab,TabNow);
						};
					},null,callTab,Functions.TabNow);
																			
				}
			}		
		},

		/**
		 * manipulador de eventos load/click/mousemove e outros
		 * @param {[type]}   objs     [elemento DOM]
		 * @param {[type]}   event    [evento]
		 * @param {Function} callback [função a ser executado no evento]
		 * @param {[type]}   mode     [modo de captura]
		 * @param {[type]}   elem2    [passagem de parametro]
		 * @param {[type]}   table    [passagem de parametro]
		 */
		addEvent:function(objs,event,callback,mode,par1,par2){
			
			if(mode == undefined)
				mode = true;

			if(objs == undefined)
				objs = window; 
			if(objs.addEventListener){ 				
				return objs.addEventListener(event,function(){
					if(callback)
						callback(objs,par1,par2);
				},mode); 
			}else if(objs.attachEvent){
				return objs.attachEvent('on'+event,function(){
					if(callback)
						callback(objs,par1,par2);
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
		/**
		 * captura um elemento DOM por seu atributo
		 * @param {[type]} attribute [atributo]
		 * @param {[type]} value     [valor]
		 * @param {[type]} element   [elemento DOM]
		 */
		FindByAttr:function(attribute, value,element){
			if(element == undefined)
				element = document;

		  var All = element.getElementsByTagName('*');
		  for (var i = 0; i < All.length; i++)       {
		    if (All[i].getAttribute(attribute) == value) { return All[i]; }
		  }
		},

		/**
		 * abre uma aba
		 * @param  {[type]} dataFor  [id da aba]
		 * @param  {[type]} mode     [modo de abertura]
		 * @param  {[type]} idTabNow [id do itab]
		 * @return null
		 */
		openTab:function(dataFor,mode,idTabNow){

			
			if(document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] ') && mode != 'init' && mode != 'initauto' && mode != 'init2'){
				
				document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"]').setAttribute('data-mode','notransition');					
				document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"]').setAttribute('data-status','');	
				document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] span').style.width = '0px';
				
				setTimeout(function(){
					document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"]').removeAttribute('data-mode');
					document.querySelector('#'+idTabNow).querySelector('[data-rel="progress"]').setAttribute('data-status','step-complete');											
					document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] span').style.width = null;
				},100);
				if(typeof progressTime != 'undefined'){
					clearInterval(progressTime[idTabNow]);
				}
			}

			if(idTabNow == undefined)
			idTabNow = Functions.TabNow;
		
			if( mode == undefined || mode == 'initauto' )
				mode = 'normal';
										
			var tab = document.querySelector('[id="'+idTabNow+'"]').querySelectorAll('[data-rel="tab"][data-idtab="'+idTabNow+'"]');
			var slide = document.querySelector('[id="'+idTabNow+'"]').querySelectorAll('[data-rel="slide"][data-idtab="'+idTabNow+'"]');
			

			for(var i = 0;i<tab.length;i++){							
				if( typeof tab[i] == 'object' ){						
					if(mode == 'normal' || mode == 'init2')					
						tab[i].setAttribute('data-status','');																							
				}
			}

 			for(var i = 0;i<slide.length;i++){			
				 if( typeof slide[i] == 'object' ){									
					slide[i].setAttribute('data-status','');																							
					// slide[i].style.height = '0px';																							
				 }
			}		
			
			

		 	if(document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]')){
				document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]').setAttribute('data-status','active');
				
				
				var tabContentHeight = document.querySelector('[data-idtab="'+idTabNow+'"]').offsetHeight;
				// document.querySelector('[data-idtab="'+idTabNow+'"][data-id="'+dataFor+'"]').style.height = (tabContentHeight)+'px';
				
				
				if(mode != 'init2')
				for(var i=0;i<Functions.actClickTab.length;i++){						
						if(Functions.actClickTab[i][idTabNow]){
							if(Functions.actClickTab[i][idTabNow]['tab'] == dataFor){
								var calbin = Functions.actClickTab[i][idTabNow]['callback'] || null;							
								if(calbin != null && typeof calbin == 'function')
									calbin(dataFor,document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]'));							
							}
						}
						
				}

				
	

		 	}
			

			var dataHash = document.querySelector('[data-idtab="'+idTabNow+'"]').getAttribute('data-hash');						 	
			if(dataHash == "true" || dataHash == true){
				 if(window.location.hash)
                    var hash = String(window.location.hash).replace('#',''); 
                                   
                 if(mode != 'init')
					 window.location = "#"+dataFor;
			}


			
			var actionTabclick = document.querySelector('[data-idtab="'+idTabNow+'"]').getAttribute('data-tabclick');

			if(actionTabclick){

				eval('var fn = '+actionTabclick+';');	
				var fn_option = {
					tab: {
						name:dataFor,
						content:document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]').innerHTML,
						element:document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]')
					},
					slide: {
						name:dataFor,
						content:document.querySelector('[data-idtab="'+idTabNow+'"][data-id="'+dataFor+'"]').innerHTML,
						element:document.querySelector('[data-idtab="'+idTabNow+'"][data-id="'+dataFor+'"]')
					}

				};
				
				if(hash != undefined || (mode != 'init' && mode != 'init2')){					
				 	fn(fn_option);
				}
							
			}

			
			/*
			
			
				corrigir implementação

			if(typeof Functions.eventClickFunctions['!unit'] != 'undefined'){
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
		autoslide:function(idTabNow){

			

			var autoslide = document.querySelector('#'+idTabNow).getAttribute('data-autoslide') || null;

			
				if(autoslide != null){
				
						
					document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] ').removeAttribute('data-status');
					document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] ').removeAttribute('data-mode');
					document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] span').removeAttribute('transition');

					var autoslideCheck = autoslide;
					autoslideCheck = autoslideCheck.toLowerCase();
					if(autoslideCheck.indexOf('ms') == -1){
						autoslide = autoslide+'ms'; 
					}


					document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] span').style.transition = autoslide+'';				
					document.querySelector('#'+idTabNow+' ').querySelector('[data-rel="progress"] span').removeAttribute('width');
					document.querySelector('#'+idTabNow).querySelector('[data-rel="progress"]').setAttribute('data-status','step-complete');					

					if(document.querySelector('#'+idTabNow+' [data-rel="progress"]')){
						var progressTime = Array();					
						progressTime[document.querySelector('#'+idTabNow).getAttribute('data-idtab')] = setInterval(function(){
								
							var idtabNows = document.querySelector('.itabs [data-rel="progress"]').getAttribute('data-idtab');	
								if(document.querySelector('#'+idtabNows+' [data-rel="progress"]') == null ||
									document.querySelector('#'+idtabNows+' [data-rel="progress"]') == 'null'){
									clearInterval(progressTime[idtabNows]);
									return false;
								}

								var progress_width_max = document.querySelector('#'+idtabNows+' [data-rel="progress"]').offsetWidth;
								var progress_width_value = document.querySelector('#'+idtabNows+' [data-rel="progress"] span').offsetWidth;


								 
								 if(progress_width_value >=progress_width_max){								 	 
								 	
								 	var tabindex = Number(document.querySelector('#'+idtabNows+' > [data-rel="tabs"]').querySelector('[data-idtab="'+idtabNows+'"][data-rel="tab"][data-status="active"]').getAttribute('data-index'));																 	
								 							
								 	if(document.querySelector('#'+idtabNows+' > [data-rel="tabs"]').querySelector('[data-idtab="'+idtabNows+'"][data-rel="tab"][data-index="'+(tabindex+1)+'"]')){						 
								 		var tabindexNext = document.querySelector('#'+idtabNows+' > [data-rel="tabs"]').querySelector('[data-idtab="'+idtabNows+'"][data-rel="tab"][data-index="'+(tabindex+1)+'"]').getAttribute('data-for');										
								 	}else{						 		
								 		var tabindexNext = document.querySelector('#'+idtabNows+' > [data-rel="tabs"]').querySelector('[data-idtab="'+idtabNows+'"][data-rel="tab"][data-index="'+(0)+'"]').getAttribute('data-for');										
								 	}
								 	
								 	document.querySelector('#'+idtabNows+' ').querySelector('[data-rel="progress"]').setAttribute('data-mode','notransition');					
								 	document.querySelector('#'+idtabNows+' ').querySelector('[data-rel="progress"]').setAttribute('data-status','');					
								 	
								 	Functions.openTab(tabindexNext,'initauto',idtabNows);

								 	Functions.autoslide(idtabNows);
								 	clearInterval(progressTime[idtabNows]);
								 }

						},500);		
					}			
				}
		},
		init:function(){
			var itabs = document.getElementsByClassName('itabs');	
								
			for(var i = 0;i<itabs.length;i++){

				var idTab = 'itabs'+countITabs;									
				var realIdTab =  itabs[i].getAttribute('id') || idTab;
				
				var dataStatus_key = '';
				var tab = itabs[i].querySelector('[data-rel="tabs"]').querySelectorAll('[data-rel="tab"]');
				var slide = itabs[i].querySelector('[data-rel="slides"]').querySelectorAll('[data-rel="slide"]');
				
				if( itabs[i].getAttribute('data-counttab') == tab.length)
					continue;
				
				
				itabs[i].setAttribute('data-counttab',tab.length);				
				
				if(itabs[i].getAttribute('id') == null){	
					itabs[i].setAttribute('id',idTab);		
					itabs[i].setAttribute('data-idtab',idTab);	
				}else{
					idTab = itabs[i].getAttribute('id');
					itabs[i].setAttribute('data-idtab',idTab);
				}


				if(itabs[i].querySelector('[data-rel="progress"]')){						
					itabs[i].querySelector('[data-rel="progress"]').setAttribute('data-idtab',idTab);					
					itabs[i].querySelector('[data-rel="progress"] span').setAttribute('data-idtab',idTab);					
				}

				for(var a = 0;a<slide.length;a++){				
					if( typeof slide[a] == 'object' ){					 
				 	 	if(slide[a].parentNode.parentNode.getAttribute('data-idtab') == idTab)
						slide[a].setAttribute('data-idtab',idTab);							 
						slide[a].setAttribute('data-index',a);										
					}
				}
				
				for(var a = 0;a<tab.length;a++){
					if( typeof tab[a] == 'object' ){

						if(!tab[a].getAttribute('data-for')){
							var preDataFor = tab[a].innerHTML;
							preDataFor = Functions.removeAccents(preDataFor);				
							preDataFor = preDataFor.toLowerCase();
							preDataFor = preDataFor.replace(/ /g,'-');
							tab[a].setAttribute('data-for',preDataFor);
						}

						var dataFor = tab[a].getAttribute('data-for');
						var dataStatus = tab[a].getAttribute('data-status');						
						if(dataStatus == 'active'){
							dataStatus_key = dataFor;														
						}

						tab[a].setAttribute('data-idtab',idTab);	
						tab[a].setAttribute('data-index',a);	

						tab[a].onclick = function(){
							var element = this;
							var idTabNow = element.getAttribute('data-idtab');
							var dataFor = element.getAttribute('data-for');						
							Functions.openTab(dataFor,null,idTabNow);
							return false;
						}
					
					}					
				}
				
				

				var dataHash = itabs[i].getAttribute('data-hash');				
				if((dataHash == "true" || dataHash == true) && window.location.hash){

					
                    var hash = String(window.location.hash).replace('#','');    
                    
                    // abre a aba conforme o hash da url do navegador
	                if(hash != undefined && hash.length != 0 ){    	                		                	
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


				Functions.autoslide(itabs[i].getAttribute('data-idtab'));
				

				if(Functions.loaded != null){
					Functions.loaded();
					Functions.loaded = null;
				}
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